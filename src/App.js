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
import axios from "./config/axios";
import Profile from "./components/auth/Profile";
import AddVehicleContainer from "./components/vehicle/AddVehicleContainer";
import Enquirycontainer from "./components/enquiry/Enquirycontainer";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: {},
    serverError: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetMarketList());
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          const userResponse = await axios.get("/api/users/profile", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          userDispatch({
            type: "USER_LOGIN",
            payload: userResponse.data.userData,
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }

  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="/login" element={<LoginConatiner />} />
            <Route path="/" element={<MarketContainer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addvehicle" element={<AddVehicleContainer />} />
            <Route path="/market/:id" element={<Enquirycontainer />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
