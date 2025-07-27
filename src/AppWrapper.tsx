import { useState, useMemo } from "react";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function AppWrapper() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const theme = useMemo(
        () => (isDarkMode ? darkTheme : lightTheme),
        [isDarkMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                isDarkMode={isDarkMode}
            />
        </ThemeProvider>
    );
}
