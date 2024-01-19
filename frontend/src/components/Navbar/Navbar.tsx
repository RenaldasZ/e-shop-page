import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import React from "react";
import { Link } from "react-router-dom";

const pages = [
  { title: "Home", path: "/" },
  { title: "Login", path: "/Login" },
  { title: "Register", path: "/Register" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface Props {
  handleThemeChange: () => void;
  darkMode: boolean;
}

export default function Navbar({ handleThemeChange, darkMode }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(darkMode);
  

  return (
    <AppBar color="warning" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookOutlinedIcon fontSize="large" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              e-shop
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mt: "7px",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography sx={{ fontFamily: "monospace", fontWeight: 700 }} textAlign="center">
                    <Link to={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                      {page.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <BookOutlinedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: 17, sm: 26 },
              letterSpacing: { xs: ".01rem", sm: ".3rem" },
              color: "inherit",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              e-shop
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: ".15rem",
                  }}
                >
                  {page.title}
                </Typography>
              </Button>
            ))}
          </Box>

          <Box display="flex">
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", md: "block" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                mt: "3px",
              }}
            >
              {!darkMode ? "Dark Mode" : "Light Mode" }
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} sx={{ mr: 2 }} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Ernestas" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ fontFamily: "monospace", fontWeight: 700 }} textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
