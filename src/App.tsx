import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

import Map, {
    GeolocateControl,
    Layer,
    Marker,
    NavigationControl,
    Popup,
    Source,
} from "react-map-gl/mapbox";
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
    HOSPITALS,
    DOG_PARKS,
    LIBRARIES,
    FARMERS_MARKETS,
    FOREIGN_CONSULATES,
} from "./consts/coordinates";
import Line from "./components/Line/Line";
import Polygon from "./components/Polygon/Polygon";
import Header from "./components/Header/Header";
import type { FeatureCollection, MultiPolygon } from "geojson";
import MultiPolygonComponent from "./components/MultiPolygon/MultiPolygon";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export const MapStatus = {
    NONE: 0,
    AQUARIUM: 1,
    THEATERS: 2,
    MOUNTAINS: 3,
    GOLF_COURSES: 4,
    SUPERVISOR_DISTRICTS: 5,
    HOSPITALS: 6,
    DOG_PARKS: 7,
    LIBRARIES: 8,
    FARMERS_MARKETS: 9,
    FOREIGN_CONSULATES: 10,
} as const;
export type MapStatusType = (typeof MapStatus)[keyof typeof MapStatus];

// TODO: better name
type Poly = {
    name: string;
    coords: MapCoordinates[];
};

type KeyedMultiPolygon = MultiPolygon & {
    key: string;
};

const mapboxLightStyle = "mapbox://styles/mapbox/streets-v12";
const mapboxDarkStyle = "mapbox://styles/mapbox/dark-v10";

type AppProps = {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
};

function App({ toggleDarkMode, isDarkMode }: AppProps) {
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

    const [eliminatedPolygons, setEliminatedPolygons] = useState<Poly[]>([]);
    const [eliminatedMultiPolygons, setEliminatedMultiPolygons] = useState<
        KeyedMultiPolygon[]
    >([]);
    const [showEliminatedAreas, setShowEliminatedAreas] = useState(true);
    const [zapperMode, setZapperMode] = useState(false);
    const [highlightMyPolygon, setHighlightMyPolygon] = useState(false);
    const [voronoi, setVoronoi] = useState<d3.Voronoi<any> | null>(null);
    // TODO: remove in favor of focusedMarker
    const [showPopup, setShowPopup] = useState(false);
    const [supDistrictData, setSupDistrictData] =
        useState<FeatureCollection | null>(null);

    useEffect(() => {
        fetch("https://data.sfgov.org/resource/f2zs-jevy.geojson")
            .then((response) => response.json())
            .then((data: FeatureCollection) => {
                setSupDistrictData(data);
            })
            .catch((error) => console.error("Error loading GeoJSON:", error));
    }, []);

    useEffect(() => {
        computeVoronoiDiagram(markerCoords);
    }, [markerCoords]);

    useEffect(() => {
        // Activate as soon as the control is loaded
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
            case MapStatus.HOSPITALS:
                setMarkerCoords(HOSPITALS);
                break;
            case MapStatus.DOG_PARKS:
                setMarkerCoords(DOG_PARKS);
                break;
            case MapStatus.LIBRARIES:
                setMarkerCoords(LIBRARIES);
                break;
            case MapStatus.FARMERS_MARKETS:
                setMarkerCoords(FARMERS_MARKETS);
                break;
            case MapStatus.FOREIGN_CONSULATES:
                setMarkerCoords(FOREIGN_CONSULATES);
                break;
            default:
                setMarkerCoords([]);
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

    function handleSupervisorDistrictEliminate(invert = false) {
        const district = Number(focusedMarker!.name);
        if (!invert) {
            const filtered = eliminatedMultiPolygons.filter(
                (poly) => poly.key !== `district-${district}`
            );

            if (filtered.length !== eliminatedMultiPolygons.length) {
                setEliminatedMultiPolygons(filtered);
                setFocusedMarker(null);
                setShowPopup(false);
                return;
            }
        } else {
            const filtered = eliminatedMultiPolygons.filter(
                (poly) => poly.key !== `district-${district}-others`
            );

            if (filtered.length !== eliminatedMultiPolygons.length) {
                setEliminatedMultiPolygons(filtered);
                setFocusedMarker(null);
                setShowPopup(false);
                return;
            }
        }
        if (invert) {
            supDistrictData!.features.forEach((feature, i) => {
                if (i + 1 === district) {
                    return;
                }
                const multiPolyCoords = (feature.geometry as MultiPolygon)
                    .coordinates;
                setEliminatedMultiPolygons((prev) => {
                    return [
                        ...prev,
                        {
                            key: `district-${district}-others`,
                            type: "MultiPolygon",
                            coordinates: multiPolyCoords,
                        } as KeyedMultiPolygon,
                    ];
                });
            });
            setFocusedMarker(null);
            setShowPopup(false);
            return;
        }

        const districtPolygon = supDistrictData!.features[district - 1]
            .geometry as MultiPolygon;
        const districtPolygonCoordinates = districtPolygon.coordinates;
        setEliminatedMultiPolygons((prev) => {
            return [
                ...prev,
                {
                    key: `district-${district}`,
                    type: "MultiPolygon",
                    coordinates: districtPolygonCoordinates,
                } as KeyedMultiPolygon,
            ];
        });
        setFocusedMarker(null);
        setShowPopup(false);
    }

    function handleStandardEliminiate(invert = false) {
        if (!invert) {
            const filtered = eliminatedPolygons.filter(
                (poly) => poly.name !== focusedMarker!.name
            );
            if (filtered.length !== eliminatedPolygons.length) {
                setEliminatedPolygons(filtered);
                return;
            }
        } else {
            const filtered = eliminatedPolygons.filter(
                (poly) => poly.name !== `${focusedMarker!.name}-others`
            );
            if (filtered.length !== eliminatedPolygons.length) {
                setEliminatedPolygons(filtered);
                return;
            }
        }

        const projected = projectPoint(
            focusedMarker!.longitude,
            focusedMarker!.latitude
        )!;
        voronoi.cellPolygons().forEach((_: any, idx: number) => {
            const contains = voronoi.contains(
                idx,
                projected.x,
                projected.y
            ) as boolean;
            if (!contains && !invert) {
                return;
            }
            if (contains && invert) {
                return;
            }
            const cell = voronoi.cellPolygon(idx);
            setEliminatedPolygons((prev) => [
                ...prev,
                {
                    name: invert
                        ? `${focusedMarker!.name}-others`
                        : focusedMarker!.name || "no name",
                    coords: unprojectCell(cell),
                },
            ]);
        });
    }

    function handleEliminate() {
        const map = mapRef.current;
        if (
            !(voronoi || mapStatus === MapStatus.SUPERVISOR_DISTRICTS) ||
            !map ||
            !focusedMarker
        ) {
            return;
        }

        if (mapStatus === MapStatus.SUPERVISOR_DISTRICTS && supDistrictData) {
            handleSupervisorDistrictEliminate();
            return;
        }

        handleStandardEliminiate();
    }

    function handleEliminateOthers() {
        const map = mapRef.current;
        if (
            !(voronoi || mapStatus === MapStatus.SUPERVISOR_DISTRICTS) ||
            !map ||
            !focusedMarker
        ) {
            return;
        }

        if (mapStatus === MapStatus.SUPERVISOR_DISTRICTS && supDistrictData) {
            handleSupervisorDistrictEliminate(true);
            return;
        }

        handleStandardEliminiate(true);
    }

    function handleSupervisorClick(e: MapMouseEvent) {
        if (showPopup || !supDistrictData) return;
        const clickedPoint = e.lngLat;
        const projected = projectPoint(clickedPoint.lng, clickedPoint.lat)!;
        const turfPt = turf.point([projected.x, projected.y]);
        supDistrictData.features.forEach((feature) => {
            const multiPolyCoords = (feature.geometry as MultiPolygon)
                .coordinates;
            const turfMultiPoly = turf.multiPolygon(
                multiPolyCoords.map((polyCoords) => {
                    return [
                        polyCoords[0].map((coord) => {
                            const projectedPt = projectPoint(
                                coord[0],
                                coord[1]
                            )!;
                            return [projectedPt.x, projectedPt.y];
                        }),
                    ];
                })
            );
            if (turf.booleanPointInPolygon(turfPt, turfMultiPoly)) {
                setFocusedMarker({
                    longitude: clickedPoint.lng,
                    latitude: clickedPoint.lat,
                    name: feature.properties!.sup_dist_num,
                });
                setShowPopup(true);
            }
        });
    }

    function handleMapClick(e: MapMouseEvent) {
        const map = mapRef.current;
        if (!map) return;
        if (zapperMode && showEliminatedAreas) {
            handleZap(e);
            return;
        }
        if (mapStatus == MapStatus.SUPERVISOR_DISTRICTS) {
            handleSupervisorClick(e);
        }
    }

    // if any eliminated polygon contains the clicked point, remove it
    function handleZap(e: MapMouseEvent) {
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
        eliminatedMultiPolygons.forEach((multiPoly) => {
            const multiPolyCoords = multiPoly.coordinates;
            const turfMultiPoly = turf.multiPolygon(
                multiPolyCoords.map((polyCoords) => {
                    return [
                        polyCoords[0].map((coord) => {
                            const projectedPt = projectPoint(
                                coord[0],
                                coord[1]
                            )!;
                            return [projectedPt.x, projectedPt.y];
                        }),
                    ];
                })
            );
            if (turf.booleanPointInPolygon(turfPt, turfMultiPoly)) {
                setEliminatedMultiPolygons((prev) =>
                    prev.filter((p) => p.key !== multiPoly.key)
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
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
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
                    mapStyle={isDarkMode ? mapboxDarkStyle : mapboxLightStyle}
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
                    onClick={handleMapClick}
                    maxPitch={0}
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
                    <NavigationControl position="bottom-right" />
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
                                    background: isDarkMode
                                        ? "#b0b0b0"
                                        : "#000000",
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
                            color={isDarkMode ? "#b0b0b0" : "#000000"}
                            width={2}
                        />
                    ))}
                    {highlightMyPolygon && (
                        <>
                            {lineCoords
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
                            {supDistrictData &&
                                mapStatus === MapStatus.SUPERVISOR_DISTRICTS &&
                                supDistrictData.features
                                    .map((feature) => {
                                        const multiPolyCoords = (
                                            feature.geometry as MultiPolygon
                                        ).coordinates;
                                        const turfMultiPoly = turf.multiPolygon(
                                            multiPolyCoords.map(
                                                (polyCoords) => {
                                                    return [
                                                        polyCoords[0].map(
                                                            (coord) => {
                                                                const projectedPt =
                                                                    projectPoint(
                                                                        coord[0],
                                                                        coord[1]
                                                                    )!;
                                                                return [
                                                                    projectedPt.x,
                                                                    projectedPt.y,
                                                                ];
                                                            }
                                                        ),
                                                    ];
                                                }
                                            )
                                        );
                                        return {
                                            turfMultiPoly,
                                            multiPolyCoords,
                                        };
                                    })
                                    .filter(({ turfMultiPoly }) => {
                                        const projectedPt = projectPoint(
                                            currentLocation.longitude,
                                            currentLocation.latitude
                                        )!;
                                        const containsPoint =
                                            turf.booleanPointInPolygon(
                                                turf.point([
                                                    projectedPt.x,
                                                    projectedPt.y,
                                                ]),
                                                turfMultiPoly
                                            );
                                        return containsPoint;
                                    })
                                    .map(({ multiPolyCoords }, i) => (
                                        <MultiPolygonComponent
                                            geojsonData={
                                                {
                                                    key: `my-poly-${i}`,
                                                    type: "MultiPolygon",
                                                    coordinates:
                                                        multiPolyCoords,
                                                } as KeyedMultiPolygon
                                            }
                                            key={`my-poly-${i}`}
                                            color="#0000ff"
                                        />
                                    ))}
                        </>
                    )}
                    {showEliminatedAreas && (
                        <>
                            {[...eliminatedPolygons].map((poly, i) => (
                                <Polygon
                                    key={`eliminated-${i}`}
                                    coords={poly.coords}
                                    color="#ff0000"
                                />
                            ))}
                            {eliminatedMultiPolygons.map((poly, i) => (
                                <MultiPolygonComponent
                                    geojsonData={poly}
                                    key={`eliminated-poly-${i}`}
                                />
                            ))}
                        </>
                    )}
                    {focusedMarker && showPopup && (
                        <Popup
                            longitude={focusedMarker.longitude}
                            latitude={focusedMarker.latitude}
                            onClose={() => {
                                setFocusedMarker(null);
                                setShowPopup(false);
                            }}
                            closeButton={false}
                        >
                            <div
                                className={styles.popup}
                                style={{
                                    background: isDarkMode ? "#1a1a1a" : "#fff",
                                }}
                            >
                                {focusedMarker.name}
                                <Button
                                    onClick={handleEliminate}
                                    variant="outlined"
                                >
                                    {eliminatedPolygons.find(
                                        (poly) =>
                                            poly.name === focusedMarker.name
                                    ) ||
                                    eliminatedMultiPolygons.find(
                                        (poly) =>
                                            poly.key ===
                                            `district-${Number(
                                                focusedMarker.name
                                            )}`
                                    )
                                        ? "Undo"
                                        : "Eliminate"}
                                </Button>
                                <Button
                                    onClick={handleEliminateOthers}
                                    variant="outlined"
                                >
                                    {eliminatedPolygons.find(
                                        (poly) =>
                                            poly.name ===
                                            `${focusedMarker.name}-others`
                                    ) ||
                                    eliminatedMultiPolygons.find(
                                        (poly) =>
                                            poly.key ===
                                            `district-${Number(
                                                focusedMarker.name
                                            )}-others`
                                    )
                                        ? "Undo"
                                        : "Eliminate Others"}
                                </Button>
                            </div>
                        </Popup>
                    )}
                    {mapStatus === MapStatus.SUPERVISOR_DISTRICTS &&
                        supDistrictData && (
                            <Source
                                key={"district-data"}
                                type="geojson"
                                data={supDistrictData}
                            >
                                <Layer
                                    type="line"
                                    paint={{
                                        "line-color": isDarkMode
                                            ? "#b0b0b0"
                                            : "#000000",
                                        "line-width": 2,
                                    }}
                                />
                            </Source>
                        )}
                </Map>
            </div>
        </div>
    );
}

export default App;
