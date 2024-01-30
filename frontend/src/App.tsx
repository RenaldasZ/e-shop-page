import { Container, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./context/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import agent from "./api/agent";
import { CatalogContext } from "./context/CatalogContext";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";

function App() {
  const { darkMode, setDarkMode } = useContext(LoginContext);
  const [paletteType, setPaletteType] = useState<PaletteMode>(
    (localStorage.getItem("darkMode") as PaletteMode) || "light"
  );
  const { loading, setLoading, setProducts, setFilteredProducts, setTotalCount } = useContext(CatalogContext);

  const productsPerPage = 6;

  useEffect(() => {
    agent.Catalog.getAllProducts()
      .then((response) => {
        setProducts(response.results);
        setFilteredProducts(response.results);
        setTotalCount(response.results.length / productsPerPage);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setProducts, setFilteredProducts, setTotalCount, setLoading]);

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

  if (loading) {
    return <LoadingComponent message="Loading Products" />;
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
