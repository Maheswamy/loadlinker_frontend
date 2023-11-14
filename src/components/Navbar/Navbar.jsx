import React from "react";
import { Grid } from "@mui/material";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import AuthSection from "./AuthSection";

const Navbar = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      component={"nav"}
      maxWidth="xl"
      elevation={10}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Logo />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <NavigationLinks />
        <AuthSection />
      </Grid>
    </Grid>
  );
};

export default Navbar;
