#!/usr/bin/env python3
"""
CSV to MapCoordinates TypeScript Converter

This script reads a CSV file and converts it to TypeScript MapCoordinates instances.
Expected CSV columns: name, latitude, longitude (and optionally other columns)
"""

import csv
import sys
import argparse
from pathlib import Path
from typing import List, Dict, Any


def clean_string(s: str) -> str:
    """Clean and escape string for TypeScript output."""
    return s.strip().replace('"', '\\"')


def convert_csv_to_mapcoordinates(csv_file: str, output_file: str = None, array_name: str = None) -> str:
    """
    Convert CSV file to TypeScript MapCoordinates array.
    
    Args:
        csv_file: Path to the CSV file
        output_file: Optional output file path (if None, returns string)
        array_name: Name for the TypeScript array variable
    
    Returns:
        TypeScript code as string
    """
    
    # Determine array name from filename if not provided
    if not array_name:
        filename = Path(csv_file).stem
        # Convert filename to camelCase
        parts = filename.replace('-', '_').replace(' ', '_').split('_')
        array_name = parts[0].lower() + ''.join(word.capitalize() for word in parts[1:])
    
    coordinates = []
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            # Try to detect delimiter
            sample = file.read(1024)
            file.seek(0)
            sniffer = csv.Sniffer()
            delimiter = sniffer.sniff(sample).delimiter
            
            reader = csv.DictReader(file, delimiter=delimiter)
            
            # Check if required columns exist
            required_cols = ['latitude', 'longitude']
            available_cols = [col.strip().lower() for col in reader.fieldnames]
            
            # Find column mappings (case-insensitive)
            col_mapping = {}
            for req_col in required_cols:
                for avail_col in reader.fieldnames:
                    if avail_col.strip().lower() == req_col:
                        col_mapping[req_col] = avail_col
                        break
            
            # Find name column (could be 'name', 'title', etc.)
            name_col = None
            for col in reader.fieldnames:
                if col.strip().lower() in ['name', 'title', 'location', 'place']:
                    name_col = col
                    break
            
            if 'latitude' not in col_mapping or 'longitude' not in col_mapping:
                raise ValueError(f"CSV must contain 'latitude' and 'longitude' columns. Found: {reader.fieldnames}")
            
            for row in reader:
                try:
                    # Parse coordinates
                    lat = float(row[col_mapping['latitude']])
                    lng = float(row[col_mapping['longitude']])
                    
                    coord = {
                        'longitude': lng,
                        'latitude': lat,
                    }
                    
                    # Add name if available
                    if name_col and row[name_col].strip():
                        coord['name'] = clean_string(row[name_col])
                    
                    coordinates.append(coord)
                    
                except (ValueError, KeyError) as e:
                    print(f"Warning: Skipping row due to error: {e}")
                    continue
    
    except FileNotFoundError:
        raise FileNotFoundError(f"CSV file not found: {csv_file}")
    except Exception as e:
        raise Exception(f"Error reading CSV file: {e}")
    
    # Generate TypeScript code
    ts_code = generate_typescript_code(coordinates, array_name)
    
    # Write to file if specified
    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(ts_code)
        print(f"TypeScript code written to: {output_file}")
    
    return ts_code


def generate_typescript_code(coordinates: List[Dict[str, Any]], array_name: str) -> str:
    """Generate TypeScript code from coordinates data."""
    
    lines = [
        "export type MapCoordinates = {",
        "    longitude: number;",
        "    latitude: number;",
        "    name?: string;",
        "};",
        "",
        f"export const {array_name}: MapCoordinates[] = ["
    ]
    
    for i, coord in enumerate(coordinates):
        lines.append("    {")
        lines.append(f"        longitude: {coord['longitude']},")
        lines.append(f"        latitude: {coord['latitude']},")
        
        if 'name' in coord:
            lines.append(f'        name: "{coord["name"]}"')
        
        if i < len(coordinates) - 1:
            lines.append("    },")
        else:
            lines.append("    }")
    
    lines.append("];")
    
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Convert CSV file to TypeScript MapCoordinates array",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python csv_to_mapcoordinates.py input.csv
  python csv_to_mapcoordinates.py input.csv -o output.ts
  python csv_to_mapcoordinates.py hospitals.csv -a hospitalLocations -o hospitals.ts
  
CSV Requirements:
  - Must contain 'latitude' and 'longitude' columns
  - Optionally contains 'name' column (or similar: title, location, place)
  - Columns are case-insensitive
        """
    )
    
    parser.add_argument('csv_file', help='Input CSV file path')
    parser.add_argument('-o', '--output', help='Output TypeScript file path')
    parser.add_argument('-a', '--array-name', help='Name for the TypeScript array variable')
    parser.add_argument('--print', action='store_true', help='Print output to console')
    
    args = parser.parse_args()
    
    try:
        result = convert_csv_to_mapcoordinates(
            args.csv_file, 
            args.output, 
            args.array_name
        )
        
        if args.print or not args.output:
            print("\nGenerated TypeScript code:")
            print("-" * 50)
            print(result)
            
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()