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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "@mui/icons-material";

interface Props {
  handleThemeChange: () => void;
  darkMode: boolean;
}

export default function Navbar({ handleThemeChange }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { darkMode, userName } = useContext(LoginContext);
  const { userId, setUserId } = useContext(LoginContext);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId-eshop");
    setUserId(null);
    setAnchorElUser(null);
    toast.success("You Have Succesfully Logged Out");
    navigation("/");
  };

  const pages =
    userId === null
      ? [
          { title: "Home", path: "/" },
          { title: "Login", path: "/Login" },
          { title: "Register", path: "/Register" },
        ]
      : [{ title: "Home", path: "/" }];

  const settings = [
    { title: "Profile" },
    { title: "Account" },
    { title: "Dashboard" },
    { title: "Logout", action: handleLogout },
  ];

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

  return (
    <AppBar color="transparent" position="static" elevation={5}>
      <Container maxWidth="xl">
        <Toolbar sx={{ width: "100%", justifyContent: "space-between" }} disableGutters>
          <BookOutlinedIcon fontSize="large" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 500,
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
                  <Typography sx={{ fontFamily: "sans-serif", fontWeight: 500, color: "inherit" }} textAlign="center">
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
              fontFamily: "sans-serif",
              fontWeight: 500,
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
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "inherit",
                  display: "block",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    letterSpacing: ".15rem",
                  }}
                >
                  {page.title}
                </Typography>
              </Button>
            ))}
          </Box>

          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent="-1" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <Box display="flex">
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", md: "block" },
                fontFamily: "sans-serif",
                fontWeight: 500,
                letterSpacing: ".1rem",
                color: "inherit",
                mt: "3px",
              }}
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} sx={{ mr: 2 }} />
          </Box>

          {userId != null && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${userName}`.toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) =>
                  setting.title === "Logout" ? (
                    <MenuItem key={setting.title} onClick={setting.action}>
                      <Typography sx={{ fontFamily: "sans-serif", fontWeight: 500 }} textAlign="center">
                        Logout
                      </Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                      <Typography sx={{ fontFamily: "sans-serif", fontWeight: 500 }} textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
