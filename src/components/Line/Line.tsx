import { Layer, Source } from "react-map-gl/mapbox";
import type { MapCoordinates } from "../../consts/coordinates";

type LineProps = {
    coords: MapCoordinates[];
    color?: string;
    width?: number;
};

export default function Line({ coords, color, width }: LineProps) {
    return (
        <Source
            type="geojson"
            data={{
                type: "FeatureCollection",
                features: [
                    {
                        properties: {
                            color: color || "#ff0000",
                            width: width || 2,
                        },
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: coords.map((pt) => [
                                pt.longitude,
                                pt.latitude,
                            ]),
                        },
                    },
                ],
            }}
        >
            <Layer
                type="line"
                paint={{
                    "line-color": color || "#ff0000",
                    "line-width": width || 2,
                }}
            />
        </Source>
    );
}
