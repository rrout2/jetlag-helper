import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

import Map, { GeolocateControl, Marker, Popup } from "react-map-gl/mapbox";
import type {
    MapMouseEvent,
    MapRef,
    ViewStateChangeEvent,
} from "react-map-gl/mapbox";
// @ts-expect-error No type declaration
import * as d3 from "d3";
import * as turf from "@turf/turf";
import { Button } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    DEFAULT_VIEW_STATE,
    type MapCoordinates,
    AQUARIUMS,
    TOP_LEFT,
    BOTTOM_RIGHT,
    THEATERS,
    MOUNTAINS,
    GOLF_COURSES,
} from "./consts/coordinates";
import Line from "./components/Line/Line";
import Polygon from "./components/Polygon/Polygon";
import Header from "./components/Header/Header";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MapStatus = {
    NONE: 0,
    AQUARIUM: 1,
    THEATERS: 2,
    MOUNTAINS: 3,
    GOLF_COURSES: 4,
} as const;
export type MapStatusType = (typeof MapStatus)[keyof typeof MapStatus];

type Polygon = {
    name: string;
    coords: MapCoordinates[];
};

function App() {
    const mapRef = useRef<MapRef>(null);
    const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
    const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
    const [lineCoords, setLineCoords] = useState<MapCoordinates[][]>([]);
    const [mapStatus, setMapStatus] = useState<MapStatusType>(MapStatus.NONE);
    const [markerCoords, setMarkerCoords] = useState<MapCoordinates[]>([]);
    const [focusedMarker, setFocusedMarker] = useState<MapCoordinates | null>(
        null
    );
    const [currentLocation, setCurrentLocation] = useState<MapCoordinates>({
        longitude: 0,
        latitude: 0,
    });

    const [eliminatedPolygons, setEliminatedPolygons] = useState<Polygon[]>([]);
    const [showEliminatedAreas, setShowEliminatedAreas] = useState(true);
    const [zapperMode, setZapperMode] = useState(false);
    const [highlightMyPolygon, setHighlightMyPolygon] = useState(false);
    const [voronoi, setVoronoi] = useState<d3.Voronoi<any> | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        computeVoronoiDiagram(markerCoords);
    }, [markerCoords]);

    useEffect(() => {
        // Activate as soon as the control is loaded
        console.log("Activating geolocate control ", !!geoControlRef.current);
        geoControlRef.current?.trigger();
    }, [geoControlRef.current]);

    useEffect(() => {
        setShowPopup(false);
        setFocusedMarker(null);
        switch (mapStatus) {
            case MapStatus.NONE:
                setMarkerCoords([]);
                break;
            case MapStatus.AQUARIUM:
                setMarkerCoords(AQUARIUMS);
                break;
            case MapStatus.THEATERS:
                setMarkerCoords(THEATERS);
                break;
            case MapStatus.MOUNTAINS:
                setMarkerCoords(MOUNTAINS);
                break;
            case MapStatus.GOLF_COURSES:
                setMarkerCoords(GOLF_COURSES);
                break;
        }
    }, [mapStatus]);

    const projectPoint = (lng: number, lat: number) => {
        return mapRef.current?.project([lng, lat]);
    };

    const unprojectCell = (cell: any): MapCoordinates[] => {
        return cell
            .map((pt: any) => {
                const unprojected = mapRef.current!.unproject(pt);
                if (unprojected) {
                    return {
                        longitude: unprojected.lng,
                        latitude: unprojected.lat,
                    };
                }
            })
            .filter((pt: any) => pt !== undefined);
    };

    function computeVoronoiDiagram(
        points: MapCoordinates[],
        onlyVoronoi = false
    ) {
        if (!mapRef.current) return;

        const projectedPoints = points
            .map((point) => projectPoint(point.longitude, point.latitude)!)
            .map((point) => [point.x, point.y]);
        const delaunay = d3.Delaunay.from(
            projectedPoints,
            (d: number[]) => d[0],
            (d: number[]) => d[1]
        );
        const tl = projectPoint(TOP_LEFT.longitude, TOP_LEFT.latitude)!;
        const br = projectPoint(BOTTOM_RIGHT.longitude, BOTTOM_RIGHT.latitude)!;

        const vor = delaunay.voronoi([tl.x, tl.y, br.x, br.y]);
        setVoronoi(vor);
        if (onlyVoronoi) return;
        const newCoords = vor
            .cellPolygons()
            .map(unprojectCell) as MapCoordinates[][];
        setLineCoords([...newCoords]);
    }

    function handleEliminate() {
        const map = mapRef.current;
        if (!voronoi || !map || !focusedMarker) return;

        const filtered = eliminatedPolygons.filter(
            (poly) => poly.name !== focusedMarker.name
        );
        if (filtered.length !== eliminatedPolygons.length) {
            setEliminatedPolygons(filtered);
            return;
        }

        const projected = projectPoint(
            focusedMarker.longitude,
            focusedMarker.latitude
        )!;
        voronoi.cellPolygons().forEach((_: any, idx: number) => {
            if (!voronoi.contains(idx, projected.x, projected.y)) {
                return;
            }
            const cell = voronoi.cellPolygon(idx);
            setEliminatedPolygons((prev) => [
                ...prev,
                {
                    name: focusedMarker.name || "no name",
                    coords: unprojectCell(cell),
                },
            ]);
        });
    }

    function handleZap(e: MapMouseEvent) {
        const map = mapRef.current;
        if (!zapperMode || !map || !showEliminatedAreas) return;
        // if any eliminated polygon contains the clicked point, remove it
        const clickedPoint = e.lngLat;
        const projected = projectPoint(clickedPoint.lng, clickedPoint.lat)!;
        const turfPt = turf.point([projected.x, projected.y]);
        eliminatedPolygons.forEach((poly) => {
            const turfPoly = turf.polygon([
                poly.coords.map((pt) => {
                    const projectedPt = projectPoint(
                        pt.longitude,
                        pt.latitude
                    )!;
                    return [projectedPt.x, projectedPt.y];
                }),
            ]);
            if (turf.booleanPointInPolygon(turfPt, turfPoly)) {
                setEliminatedPolygons((prev) =>
                    prev.filter((p) => p.name !== poly.name)
                );
            }
        });
    }

    return (
        <div className={styles.app}>
            <Header
                mapStatus={mapStatus}
                setMapStatus={setMapStatus}
                showEliminatedAreas={showEliminatedAreas}
                setShowEliminatedAreas={setShowEliminatedAreas}
                zapperMode={zapperMode}
                setZapperMode={setZapperMode}
                highlightMyPolygon={highlightMyPolygon}
                setHighlightMyPolygon={setHighlightMyPolygon}
            />
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
                    onMoveEnd={() => {
                        computeVoronoiDiagram(markerCoords, true);
                    }}
                    onDragEnd={() => {
                        computeVoronoiDiagram(markerCoords, true);
                    }}
                    onZoomEnd={() => {
                        computeVoronoiDiagram(markerCoords, true);
                    }}
                    onRotateEnd={() => {
                        computeVoronoiDiagram(markerCoords, true);
                    }}
                    onClick={handleZap}
                >
                    <GeolocateControl
                        trackUserLocation={true}
                        positionOptions={{
                            enableHighAccuracy: true,
                        }}
                        onGeolocate={(e: any) => {
                            const { longitude, latitude } = e.coords;
                            setCurrentLocation({ longitude, latitude });
                        }}
                        ref={geoControlRef}
                    />

                    {markerCoords.map((coord) => (
                        <Marker
                            key={`${coord.longitude}-${coord.latitude}`}
                            longitude={coord.longitude}
                            latitude={coord.latitude}
                            anchor="center"
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setFocusedMarker(coord);
                                setShowPopup(true);
                            }}
                        >
                            <div
                                style={{
                                    background: "#000000",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                }}
                            />
                        </Marker>
                    ))}
                    {lineCoords.map((lineCoord, i) => (
                        <Line
                            keyProp={`line-${i}`}
                            coords={lineCoord}
                            color="#000000"
                            width={2}
                        />
                    ))}
                    {highlightMyPolygon &&
                        lineCoords
                            .filter((lineCoord) => {
                                const turfPoly = turf.polygon([
                                    lineCoord.map((pt) => [
                                        pt.longitude,
                                        pt.latitude,
                                    ]),
                                ]);
                                return turf.booleanPointInPolygon(
                                    turf.point([
                                        currentLocation.longitude,
                                        currentLocation.latitude,
                                    ]),
                                    turfPoly
                                );
                            })
                            .map((lineCoord) => (
                                <Polygon
                                    coords={lineCoord}
                                    color="#0000ff"
                                    border={false}
                                />
                            ))}
                    {showEliminatedAreas &&
                        [...eliminatedPolygons].map((poly, i) => (
                            <Polygon
                                key={`eliminated-${i}`}
                                coords={poly.coords}
                                color="#ff0000"
                            />
                        ))}
                    {focusedMarker && showPopup && (
                        <Popup
                            longitude={focusedMarker.longitude}
                            latitude={focusedMarker.latitude}
                            onClose={() => setShowPopup(false)}
                            closeButton={false}
                        >
                            <div className={styles.popup}>
                                {focusedMarker.name}
                                <Button
                                    onClick={handleEliminate}
                                    variant="outlined"
                                >
                                    {[...eliminatedPolygons].find(
                                        (poly) =>
                                            poly.name === focusedMarker.name
                                    )
                                        ? "Undo"
                                        : "Eliminate"}
                                </Button>
                            </div>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    );
}

export default App;
