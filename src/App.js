import { Grid, CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import Navbar from "./components/Navbar";
import RegisterContainer from "./components/auth/RegisterContainer";
import { useReducer } from "react";
import { UserContext } from "./contextAPI/UserContext";
import userReducer from "./contextAPI/userReducer";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: {},
    serverError: {},
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ userState, userDispatch }}>
        <Grid container direction="column">
          <Navbar />
          <Container maxWidth="xl">
            <Grid>
              <RegisterContainer />
            </Grid>
          </Container>
        </Grid>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
