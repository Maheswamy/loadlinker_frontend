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
import Enquirycontainer from "./components/enquiry/common/Enquirycontainer";
import { jwtDecode } from "jwt-decode";
import AddEnquiryConatiner from "./components/enquiry/Shipper/AddEnquiryContainer";
import { startGetVehicle } from "./redux/action/vehicleAction";
import { startGetMyBid } from "./redux/action/bidAction";
import BidContainer from "./components/bid/BidContainer";
import MyEnquirylist from "./components/enquiry/Shipper/MyEnquirylist";
import { startGetMyEnquiries } from "./redux/action/enquiryAction";
import SelectBidContainer from "./components/enquiry/Shipper/SelectBidContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import ShipmentShowPage from "./components/shipment/ShipmentShowPage";
import { startGetAllMyShipments } from "./redux/action/shipmentAction";
import ShipmentList from "./components/shipment/ShipmentList";

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
          if (jwtDecode(localStorage.getItem("token")).role === "owner") {
            dispatch(startGetVehicle());
            dispatch(startGetMyBid());
          }
          if (jwtDecode(localStorage.getItem("token")).role === "shipper") {
            dispatch(startGetMyEnquiries());
            dispatch(startGetAllMyShipments());
          }
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
        <div
          style={{
            backgroundColor: "#fff",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/register" element={<RegisterContainer />} />
              <Route path="/login" element={<LoginConatiner />} />
              <Route path="/" element={<MarketContainer />} />
              <Route path="/addvehicle" element={<AddVehicleContainer />} />
              <Route path="/market/:id" element={<Enquirycontainer />} />
              <Route path="/addenquiry" element={<AddEnquiryConatiner />} />
              <Route path="/mybids" element={<BidContainer />} />
              <Route path="/myenquiries" element={<MyEnquirylist />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/shipment/:id" element={<ShipmentShowPage />} />
              <Route path="/shipments" element={<ShipmentList />} />

              <Route
                path="/myenquiries/:id"
                element={<SelectBidContainer />}
              ></Route>
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
