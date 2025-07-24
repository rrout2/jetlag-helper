import type { MultiPolygon as MultiPolygonGeoJSON } from "geojson";
import { Source, Layer } from "react-map-gl/mapbox";

type props = {
    geojsonData: MultiPolygonGeoJSON;
    color?: string;
    border?: boolean;
};

export default function MultiPolygon({
    geojsonData,
    color,
    border = true,
}: props) {
    return (
        <Source key={"key"} type="geojson" data={geojsonData}>
            <Layer
                type="fill"
                paint={{
                    "fill-color": color || "#ff0000",
                    "fill-opacity": 0.5,
                }}
            />
            {border && (
                <Layer
                    type="line"
                    paint={{
                        "line-color": color || "#ff0000",
                        "line-width": 3,
                    }}
                />
            )}
        </Source>
    );
}
