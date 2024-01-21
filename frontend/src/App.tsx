import { Container, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./context/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { darkMode, setDarkMode } = useContext(LoginContext);
  const [paletteType, setPaletteType] = useState<PaletteMode>(
    (localStorage.getItem("darkMode") as PaletteMode) || "light"
  );

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "rgb(0, 8, 15)",
      },
    },
  });

  function handleThemeChange() {
    const newMode = darkMode ? "light" : "dark";
    localStorage.setItem("darkMode", newMode);
    setDarkMode(!darkMode);
    setPaletteType(newMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer closeOnClick position="bottom-right" theme="colored" />
      <CssBaseline />
      <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
