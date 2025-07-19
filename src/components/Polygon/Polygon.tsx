import { Source, Layer } from "react-map-gl/mapbox";
import type { MapCoordinates } from "../../consts/coordinates";

type PolygonProps = {
    key?: string;
    coords: MapCoordinates[];
    color?: string;
};

export default function Polygon({ key, coords, color }: PolygonProps) {
    return (
        <Source
            key={key}
            type="geojson"
            data={{
                type: "FeatureCollection",
                features: [
                    {
                        properties: {
                            color: color || "#ff0000",
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
                type="fill"
                paint={{
                    "fill-color": color || "#ff0000",
                    "fill-opacity": 0.5,
                }}
            />
            <Layer
                type="line"
                paint={{
                    "line-color": color || "#ff0000",
                    "line-width": 3,
                }}
            />
        </Source>
    );
}
