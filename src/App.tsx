import { useState } from "react";
import styles from "./App.module.css";

import Map, { Marker, Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { ViewStateChangeEvent } from "react-map-gl/mapbox";
import { Button } from "@mui/material";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const DEFAULT_VIEW_STATE = {
    longitude: -122.43,
    latitude: 37.76,
    zoom: 10.5,
};

const CAL_ACADEMY_AQUARIUM = {
    longitude: -122.466,
    latitude: 37.7695,
};

const AQUARIUM_OF_THE_BAY = {
    longitude: -122.4095,
    latitude: 37.8085,
};

function App() {
    const [viewState, setViewState] = useState(DEFAULT_VIEW_STATE);

    const [showPopup, setShowPopup] = useState(false);

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

    const aquariumMidpoint = {
        longitude:
            (CAL_ACADEMY_AQUARIUM.longitude + AQUARIUM_OF_THE_BAY.longitude) /
            2,
        latitude:
            (CAL_ACADEMY_AQUARIUM.latitude + AQUARIUM_OF_THE_BAY.latitude) / 2,
    };

    const aquariumSlope =
        (AQUARIUM_OF_THE_BAY.longitude - CAL_ACADEMY_AQUARIUM.longitude) /
        (AQUARIUM_OF_THE_BAY.latitude - CAL_ACADEMY_AQUARIUM.latitude);
    const line = (
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
                            coordinates: [
                                [
                                    aquariumMidpoint.longitude +
                                        aquariumSlope * 0.01,
                                    aquariumMidpoint.latitude +
                                        aquariumSlope * 0.01,
                                ],
                                [
                                    aquariumMidpoint.longitude,
                                    aquariumMidpoint.latitude,
                                ],
                            ],
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
                    {line}
                </Map>
            </div>
        </div>
    );
}

export default App;
