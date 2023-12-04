import React from "react";
import { Typography, Container, Link, IconButton, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        backgroundColor: "#f0f0f0",
        position: "sticky",
        bottom: "0",
        zIndex: 1000, // Adjust the zIndex as needed
      }}
      maxWidth="100%"
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body2">
            © {new Date().getFullYear()} LoadLinker. All rights reserved.
          </Typography>
        </Grid>
        <Grid item>
          <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
            LoadLinker
          </Link>
          <IconButton
            color="primary"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="primary"
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="primary"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="primary"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
