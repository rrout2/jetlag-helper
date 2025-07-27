import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MapProvider } from "react-map-gl/mapbox-legacy";
import AppWrapper from "./AppWrapper.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MapProvider>
            <AppWrapper />
        </MapProvider>
    </StrictMode>
);
