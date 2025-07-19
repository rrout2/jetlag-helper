import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

import Map, { Marker, Layer, Source, useMap } from "react-map-gl/mapbox";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/mapbox";
import * as turf from "@turf/turf";
// @ts-expect-error No type declaration
import * as d3 from "d3";
import { Button } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type ViewState = {
    longitude: number;
    latitude: number;
    zoom?: number;
    color?: string;
};

const DEFAULT_VIEW_STATE: ViewState = {
    longitude: -122.43,
    latitude: 37.76,
    zoom: 12,
};

const CAL_ACADEMY_AQUARIUM: ViewState = {
    longitude: -122.466,
    latitude: 37.7695,
};

const AQUARIUM_OF_THE_BAY: ViewState = {
    longitude: -122.4095,
    latitude: 37.8085,
};

const AQUARIUMS = [CAL_ACADEMY_AQUARIUM, AQUARIUM_OF_THE_BAY];

const measureDistance = (marker: ViewState, target: ViewState): number => {
    const line = turf.lineString([
        [marker.longitude, marker.latitude],
        [target.longitude, target.latitude],
    ]);
    return turf.length(line);
};

function App() {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
    const [markers, setMarkers] = useState<ViewState[]>([]);
    const [lineCoords, setLineCoords] = useState<ViewState[][]>([]);

    useEffect(() => {
        createMarkers();
    }, []);

    useEffect(() => {
        voronoi(AQUARIUMS);
    }, [mapRef.current?.getBounds()]);

    const projectPoint = (lng: number, lat: number) => {
        return mapRef.current?.project([lng, lat]);
    };

    function voronoi(points: ViewState[]) {
        if (!mapRef.current) return;

        const projectedPoints = points
            .map((point) => projectPoint(point.longitude, point.latitude))
            .filter((point) => point !== undefined)
            .map((point) => [point.x, point.y]);
        const delaunay = d3.Delaunay.from(
            projectedPoints,
            (d: number[]) => d[0],
            (d: number[]) => d[1]
        );

        const topLeft = {
            longitude: -122.519303,
            latitude: 37.817117,
        };
        const bottomRight = {
            longitude: -122.353658,
            latitude: 37.708856,
        };
        const tl = projectPoint(topLeft.longitude, topLeft.latitude)!;
        const br = projectPoint(bottomRight.longitude, bottomRight.latitude)!;

        const voronoi = delaunay.voronoi([tl.x, tl.y, br.x, br.y]);
        const voronoiCells = voronoi.cellPolygons();
        const newCoords: ViewState[][] = [];
        for (const cell of voronoiCells) {
            const cellCoords = cell
                .map((pt: any) => {
                    const unprojected = mapRef.current?.unproject(pt);
                    if (unprojected) {
                        return {
                            longitude: unprojected.lng,
                            latitude: unprojected.lat,
                        };
                    }
                })
                .filter((pt: any) => pt !== undefined);
            newCoords.push(cellCoords);
        }
        setLineCoords([...newCoords]);
    }

    function createMarkers() {
        const newMarkers: ViewState[] = [];
        const topLeft = {
            longitude: -122.519303,
            latitude: 37.807117,
        };
        const bottomRight = {
            longitude: -122.343658,
            latitude: 37.708856,
        };
        const sideLength = 35;
        const xStep = (bottomRight.longitude - topLeft.longitude) / sideLength;
        const yStep = (bottomRight.latitude - topLeft.latitude) / sideLength;
        for (let i = 0; i < sideLength; i++) {
            for (let j = 0; j < sideLength; j++) {
                const marker: ViewState = {
                    longitude: topLeft.longitude + i * xStep,
                    latitude: topLeft.latitude + j * yStep,
                };
                const distanceToCalAcademy = measureDistance(
                    marker,
                    CAL_ACADEMY_AQUARIUM
                );
                const distanceToAquariumOfTheBay = measureDistance(
                    marker,
                    AQUARIUM_OF_THE_BAY
                );
                const closerToCalAcademy =
                    distanceToCalAcademy < distanceToAquariumOfTheBay;
                marker.color = closerToCalAcademy ? "#0000ff" : "#ee0000";
                newMarkers.push(marker);
            }
        }
        setMarkers(newMarkers);
    }

    const aquariumOfTheBayMarker = (
        <Marker
            longitude={AQUARIUM_OF_THE_BAY.longitude}
            latitude={AQUARIUM_OF_THE_BAY.latitude}
            anchor="center"
        >
            <div
                style={{
                    background: "#ff0000",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                }}
            />
        </Marker>
    );

    const calAcademyAquariumMarker = (
        <Marker
            longitude={CAL_ACADEMY_AQUARIUM.longitude}
            latitude={CAL_ACADEMY_AQUARIUM.latitude}
            anchor="center"
        >
            <div
                style={{
                    background: "#ff0000",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                }}
            />
        </Marker>
    );

    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setViewState(DEFAULT_VIEW_STATE)}
                >
                    Reset
                </Button>
            </div>
            <div className={styles.mapWrapper}>
                <Map
                    ref={mapRef}
                    {...viewState}
                    onMove={(evt: ViewStateChangeEvent) =>
                        setViewState(evt.viewState)
                    }
                    mapboxAccessToken={MAPBOX_TOKEN}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                >
                    {calAcademyAquariumMarker}
                    {aquariumOfTheBayMarker}
                    {lineCoords.map((lineCoord) => (
                        <Source
                            type="geojson"
                            data={{
                                type: "FeatureCollection",
                                features: [
                                    {
                                        properties: {
                                            color: "#ff0000",
                                            width: 2,
                                        },
                                        type: "Feature",
                                        geometry: {
                                            type: "LineString",
                                            coordinates: lineCoord.map((pt) => [
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
                                    "line-color": "#ff0000",
                                    "line-width": 2,
                                }}
                            />
                        </Source>
                    ))}
                    {/* {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            anchor="center"
                        >
                            <div
                                style={{
                                    background: marker.color,
                                    width: "4px",
                                    height: "4px",
                                    borderRadius: "50%",
                                }}
                            />
                        </Marker>
                    ))} */}
                </Map>
            </div>
        </div>
    );
}

export default App;
