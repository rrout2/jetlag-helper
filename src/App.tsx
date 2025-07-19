import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

import Map, { Marker, Popup } from "react-map-gl/mapbox";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl/mapbox";
// @ts-expect-error No type declaration
import * as d3 from "d3";
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    DEFAULT_VIEW_STATE,
    type MapCoordinates,
    AQUARIUMS,
    TOP_LEFT,
    BOTTOM_RIGHT,
    THEATERS,
    MOUNTAINS,
} from "./consts/coordinates";
import Line from "./components/Line/Line";
import Polygon from "./components/Polygon/Polygon";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapStatus = {
    NONE: 0,
    AQUARIUM: 1,
    THEATERS: 2,
    MOUNTAINS: 3,
} as const;
type MapStatusType = (typeof MapStatus)[keyof typeof MapStatus];

type Polygon = {
    name: string;
    coords: MapCoordinates[];
};

function App() {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);
    const [lineCoords, setLineCoords] = useState<MapCoordinates[][]>([]);
    const [mapStatus, setMapStatus] = useState<MapStatusType>(MapStatus.NONE);
    const [markerCoords, setMarkerCoords] = useState<MapCoordinates[]>([]);
    const [focusedMarker, setFocusedMarker] = useState<MapCoordinates | null>(
        null
    );
    const [eliminatedPolygons, setEliminatedPolygons] = useState<Set<Polygon>>(
        new Set()
    );
    const [showEliminatedAreas, setShowEliminatedAreas] = useState(true);
    const [voronoi, setVoronoi] = useState<d3.Voronoi<any> | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        computeVoronoiDiagram(markerCoords);
    }, [markerCoords]);

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

        const voronoi = delaunay.voronoi([tl.x, tl.y, br.x, br.y]);
        setVoronoi(voronoi);
        if (onlyVoronoi) return;
        const newCoords = voronoi.cellPolygons().map(unprojectCell);
        setLineCoords([...newCoords]);
    }

    function handleEliminate() {
        const map = mapRef.current;
        if (!voronoi || !map || !focusedMarker) return;

        const existingPolygon = [...eliminatedPolygons].find(
            (poly) => poly.name === focusedMarker.name
        );
        if (existingPolygon) {
            setEliminatedPolygons((prev) => {
                const newSet = new Set(prev);
                newSet.delete(existingPolygon);
                return newSet;
            });
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
            setEliminatedPolygons((prev) => {
                const cell = voronoi.cellPolygon(idx);
                return new Set([
                    ...prev,
                    {
                        name: focusedMarker.name || "no name",
                        coords: unprojectCell(cell),
                    },
                ]);
            });
        });
    }

    return (
        <div className={styles.app}>
            <div className={styles.header}>
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
                        <MenuItem value={MapStatus.AQUARIUM}>
                            Aquariums
                        </MenuItem>
                        <MenuItem value={MapStatus.THEATERS}>Theaters</MenuItem>
                        <MenuItem value={MapStatus.MOUNTAINS}>
                            Mountains
                        </MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setViewState(DEFAULT_VIEW_STATE)}
                >
                    Reset
                </Button>
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
                    onMoveEnd={() => {
                        computeVoronoiDiagram(markerCoords, true);
                    }}
                >
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
                            key={`line-${i}`}
                            coords={lineCoord}
                            color="#000000"
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
                                <Button onClick={handleEliminate}>
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
