import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    IconButton,
    Button,
    Tooltip,
    Chip,
    Box,
} from "@mui/material";
import styles from "./Header.module.css";
import { MapStatus, type MapStatusType } from "../../App";
import { Brightness7, Brightness4, Thermostat, Delete } from "@mui/icons-material";
import type { MapCoordinates } from "../../consts/coordinates";

type ThermometerPair = {
    id: string;
    pointA: MapCoordinates;
    pointB: MapCoordinates;
    length: number;
};

type HeaderProps = {
    mapStatus: MapStatusType;
    setMapStatus: (status: MapStatusType) => void;
    showEliminatedAreas: boolean;
    setShowEliminatedAreas: (show: boolean) => void;
    zapperMode: boolean;
    setZapperMode: (mode: boolean) => void;
    highlightMyPolygon: boolean;
    setHighlightMyPolygon: (show: boolean) => void;
    toggleDarkMode: () => void;
    isDarkMode: boolean;
    isPlacingThermometer: boolean;
    setIsPlacingThermometer: (v: boolean) => void;
    thermometerLength: number;
    setThermometerLength: (v: number) => void;
    thermometerPairs: ThermometerPair[];
    removeThermometer: (id: string) => void;
};

export default function Header({
    mapStatus,
    setMapStatus,
    showEliminatedAreas,
    setShowEliminatedAreas,
    zapperMode,
    setZapperMode,
    highlightMyPolygon,
    setHighlightMyPolygon,
    toggleDarkMode,
    isDarkMode,
    isPlacingThermometer,
    setIsPlacingThermometer,
    thermometerLength,
    setThermometerLength,
    thermometerPairs,
    removeThermometer,
}: HeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.row}>
                <IconButton onClick={toggleDarkMode} color="inherit">
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <FormControl className={styles.dropdown}>
                    <InputLabel>Map Display</InputLabel>
                    <Select
                        value={mapStatus}
                        label="Map Display"
                        onChange={(event) =>
                            setMapStatus(event.target.value as MapStatusType)
                        }
                    >
                        <MenuItem value={MapStatus.NONE}>None</MenuItem>
                        <MenuItem value={MapStatus.AQUARIUM}>Aquariums</MenuItem>
                        <MenuItem value={MapStatus.THEATERS}>Theaters</MenuItem>
                        <MenuItem value={MapStatus.MOUNTAINS}>Mountains</MenuItem>
                        <MenuItem value={MapStatus.GOLF_COURSES}>
                            Golf Courses
                        </MenuItem>
                        <MenuItem value={MapStatus.SUPERVISOR_DISTRICTS}>
                            Supervisor Districts
                        </MenuItem>
                        <MenuItem value={MapStatus.HOSPITALS}>Hospitals</MenuItem>
                        <MenuItem value={MapStatus.DOG_PARKS}>Dog Parks</MenuItem>
                        <MenuItem value={MapStatus.LIBRARIES}>Libraries</MenuItem>
                        <MenuItem value={MapStatus.FARMERS_MARKETS}>
                            Farmers Markets
                        </MenuItem>
                        <MenuItem value={MapStatus.FOREIGN_CONSULATES}>
                            Foreign Consulates
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormControlLabel
                        value="Show Eliminated Areas"
                        control={
                            <Switch
                                checked={showEliminatedAreas}
                                onChange={(e) =>
                                    setShowEliminatedAreas(e.target.checked)
                                }
                            />
                        }
                        label="Show Eliminated Areas"
                        labelPlacement="end"
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel
                        value="Zapper Mode"
                        control={
                            <Switch
                                checked={zapperMode}
                                onChange={(e) => setZapperMode(e.target.checked)}
                            />
                        }
                        label="Zapper Mode"
                        labelPlacement="end"
                    />
                </FormControl>
                <FormControl>
                    <FormControlLabel
                        value="Highlight My Polygon"
                        control={
                            <Switch
                                checked={highlightMyPolygon}
                                onChange={(e) =>
                                    setHighlightMyPolygon(e.target.checked)
                                }
                            />
                        }
                        label="Highlight My Polygon"
                        labelPlacement="end"
                    />
                </FormControl>
            </div>
            <div className={styles.row}>
                <Tooltip
                    title={
                        isPlacingThermometer
                            ? "Click on the map to place thermometer points"
                            : "Add a thermometer pair to the map"
                    }
                >
                    <Button
                        variant={isPlacingThermometer ? "contained" : "outlined"}
                        color={isPlacingThermometer ? "warning" : "secondary"}
                        size="small"
                        startIcon={<Thermostat />}
                        onClick={() => setIsPlacingThermometer(!isPlacingThermometer)}
                    >
                        {isPlacingThermometer ? "Adding..." : "Thermometer"}
                    </Button>
                </Tooltip>
                <FormControl size="small" className={styles.lengthSelect}>
                    <Select
                        value={thermometerLength}
                        onChange={(e) =>
                            setThermometerLength(e.target.value as number)
                        }
                        disabled={isPlacingThermometer}
                    >
                        <MenuItem value={0.5}>0.5 mi</MenuItem>
                        <MenuItem value={1}>1 mi</MenuItem>
                        <MenuItem value={2}>2 mi</MenuItem>
                        <MenuItem value={0}>Custom</MenuItem>
                    </Select>
                </FormControl>
                {thermometerPairs.length > 0 && (
                    <Box className={styles.thermoList}>
                        {thermometerPairs.map((pair, i) => (
                            <Chip
                                key={pair.id}
                                label={`T${i + 1} (${pair.length > 0 ? pair.length + "mi" : "custom"})`}
                                size="small"
                                onDelete={() => removeThermometer(pair.id)}
                                deleteIcon={<Delete />}
                                color="secondary"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                )}
            </div>
        </div>
    );
}
