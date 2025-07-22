import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
} from "@mui/material";
import styles from "./Header.module.css";
import { MapStatus, type MapStatusType } from "../../App";

type HeaderProps = {
    mapStatus: MapStatusType;
    setMapStatus: (status: MapStatusType) => void;
    showEliminatedAreas: boolean;
    setShowEliminatedAreas: (show: boolean) => void;
    zapperMode: boolean;
    setZapperMode: (mode: boolean) => void;
    highlightMyPolygon: boolean;
    setHighlightMyPolygon: (show: boolean) => void;
};

export default function Header({
    mapStatus,
    setMapStatus,
    showEliminatedAreas,
    setShowEliminatedAreas,
    zapperMode,
    setZapperMode,
    highlightMyPolygon,
    setHighlightMyPolygon,
}: HeaderProps) {
    return (
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
                    <MenuItem value={MapStatus.AQUARIUM}>Aquariums</MenuItem>
                    <MenuItem value={MapStatus.THEATERS}>Theaters</MenuItem>
                    <MenuItem value={MapStatus.MOUNTAINS}>Mountains</MenuItem>
                    <MenuItem value={MapStatus.GOLF_COURSES}>
                        Golf Courses
                    </MenuItem>
                    <MenuItem value={MapStatus.SUPERVISOR_DISTRICTS}>
                        Supervisor Districts
                    </MenuItem>
                </Select>
            </FormControl>
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
            <FormControl>
                <FormControlLabel
                    value="Zapper Mode"
                    control={
                        <Switch
                            checked={zapperMode}
                            onChange={(e) => setZapperMode(e.target.checked)}
                        />
                    }
                    label="Zapper Mode"
                    labelPlacement="end"
                />
            </FormControl>
            <FormControl>
                <FormControlLabel
                    value="Highlight My Polygon"
                    control={
                        <Switch
                            checked={highlightMyPolygon}
                            onChange={(e) =>
                                setHighlightMyPolygon(e.target.checked)
                            }
                        />
                    }
                    label="Highlight My Polygon"
                    labelPlacement="end"
                />
            </FormControl>
        </div>
    );
}
