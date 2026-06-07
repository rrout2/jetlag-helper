const SAVE_KEY = "jetlag-helper-state";
const CURRENT_VERSION = 1;

type Point = { longitude: number; latitude: number; name?: string };

export type SavedState = {
    version: number;
    eliminatedPolygons: { name: string; coords: Point[] }[];
    eliminatedMultiPolygons: {
        key: string;
        type: "MultiPolygon";
        coordinates: number[][][][];
    }[];
    thermometerPairs: {
        id: string;
        pointA: Point;
        pointB: Point;
        length: number;
    }[];
    mapStatus: number;
    showEliminatedAreas: boolean;
    zapperMode: boolean;
    highlightMyPolygon: boolean;
    isDarkMode: boolean;
    viewState: { longitude: number; latitude: number; zoom?: number };
};

export function loadSavedState(): SavedState | null {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return data?.version === CURRENT_VERSION
            ? (data as SavedState)
            : null;
    } catch {
        return null;
    }
}

export function saveState(state: SavedState) {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("Failed to save state:", e);
    }
}

export function loadDarkModeFromStorage(): boolean {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        return data?.isDarkMode ?? false;
    } catch {
        return false;
    }
}
