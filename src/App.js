import { Grid, CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import Navbar from "./components/Navbar";
import RegisterContainer from "./components/auth/RegisterContainer";
import { useEffect, useReducer } from "react";
import { UserContext } from "./contextAPI/UserContext";
import userReducer from "./contextAPI/userReducer";
import LoginConatiner from "./components/auth/LoginConatiner";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGetMarketList } from "./redux/action/marketAction";
import MarketContainer from "./components/market/MarketContainer";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: {},
    serverError: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetMarketList());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ userState, userDispatch }}>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="/login" element={<LoginConatiner />} />
          <Route path="/" element={<MarketContainer />} />
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
