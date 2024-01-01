import { CssBaseline } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
