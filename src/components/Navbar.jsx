import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Stack,
  Box,
  Hidden,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "./../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { jwtDecode } from "jwt-decode";
import ShipperNavbar from "./Navbar/ShipperNavbar";
import VehicleOwnerNav from "./Navbar/VehicleOwnerNav";
import AdminNavbar from "./Navbar/AdminNavbar";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navbarCondition = () => {
    const role = jwtDecode(localStorage.getItem("token")).role;
    if (role === "owner") {
      return <VehicleOwnerNav />;
    } else if (role === "shipper") {
      return <ShipperNavbar />;
    } else if (role === "admin") {
      return <AdminNavbar />;
    }
  };
  return (
    <Grid
      container
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      component={"nav"}
      maxWidth="100vw"
      marginBottom={2}
      elevation={10}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        padding: "0 40px",
        boxShadow: 3,
      }}
    >
      <Grid
        item
        xs={3}
        
        md={4}
        mx="2"
        height={"9vh"}
        gap={1}
        direction="row"
        alignItems="center"
        display={'flex'}
      >
        <img
          src="https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/loadlinker_logo.png"
          alt="Logo"
          style={{ maxWidth: "auto", maxHeight: "50px" }}
        />
        <Typography
          variant="h6"
          sx={{ marginLeft: 1, fontWeight: "900" }}
          color="primary.main"
        >
          LOADLINKER
        </Typography>
      </Grid>
      <Grid item xs={9}  md={8}>
        <Stack
          gap={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Hidden mdDown>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="button"
                color="primary"
                sx={{ textDecoration: "none" }}
              >
                Market
              </Typography>
            </Link>

            {isEmpty(userState.user) ? (
              <Stack direction="row" gap={2}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="button" color="primary">
                    Register
                  </Typography>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="button" color="primary">
                    Login
                  </Typography>
                </Link>
              </Stack>
            ) : (
              navbarCondition()
            )}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="primary"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <List >
              <ListItem component={Link} to="/">
                <Typography variant="button" color="primary">
                  Market
                </Typography>
              </ListItem>
              {isEmpty(userState.user) ? (
                <>
                  <ListItem component={Link} to="/register">
                    <Typography variant="button" color="primary">
                      Register
                    </Typography>
                  </ListItem>
                  <ListItem component={Link} to="/login">
                    <Typography variant="button" color="primary">
                      Login
                    </Typography>
                  </ListItem>
                </>
              ) : (
                <>{navbarCondition()}</>
              )}
            </List>
          </Drawer>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Navbar;
