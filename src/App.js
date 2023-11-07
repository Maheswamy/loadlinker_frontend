import { Grid, CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import Navbar from "./components/Navbar";
import RegisterContainer from "./components/auth/RegisterContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction="column">
        <Navbar />
        <Container maxWidth="xl">
          <Grid>
            <RegisterContainer />
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
