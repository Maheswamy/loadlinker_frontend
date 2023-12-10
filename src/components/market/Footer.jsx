import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const socialMediaLinks = {
  facebook: "https://www.facebook.com/your-facebook-page",
  twitter: "https://twitter.com/your-twitter-account",
  linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
  instagram: "https://www.instagram.com/your-instagram-account",
};

const Footer = () => {
  return (
    <AppBar
      position="sticky"
      
      sx={{
        marginTop:1,
        bottom: 0,
        backgroundColor: "white",
        boxShadow: "none",
      }}
    >
      <Container>
        <Toolbar>
          <Typography variant="body2" color="primary">
            © {new Date().getFullYear()} LoadLinker
          </Typography>
          <div>
            <IconButton
              color="primary"
              component={Link}
              href={socialMediaLinks.facebook}
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={Link}
              href={socialMediaLinks.twitter}
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={Link}
              href={socialMediaLinks.linkedin}
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={Link}
              href={socialMediaLinks.instagram}
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
