import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, CssBaseline, Container } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "./config/axios";
import theme from "./config/theme";
import Navbar from "./components/Navbar";
import RegisterContainer from "./components/auth/RegisterContainer";
import userReducer from "./contextAPI/userReducer";
import LoginContainer from "./components/auth/LoginContainer";
import MarketContainer from "./components/market/MarketContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import BidContainer from "./components/bid/BidContainer";
import MyEnquiryList from "./components/enquiry/Shipper/MyEnquiryList";
import ShipmentShowPage from "./components/shipment/ShipmentShowPage";
import ShipmentList from "./components/shipment/ShipmentList";
import MyVehicle from "./components/vehicle/MyVehicle";
import VehicleShowPage from "./components/vehicle/VehicleShowPage";
import { startGetMarketList } from "./redux/action/marketAction";
import {
  startPermitList,
  startGetVehicle,
  startVehicleType,
} from "./redux/action/vehicleAction";
import { startGetMyBid } from "./redux/action/bidAction";
import { startGetMyEnquiries } from "./redux/action/enquiryAction";
import { startGetAllMyShipments } from "./redux/action/shipmentAction";
import AddVehicleContainer from "./components/vehicle/AddVehicleContainer";
import EnquiryContainer from "./components/enquiry/common/EnquiryContainer";
import AddEnquiryContainer from "./components/enquiry/Shipper/AddEnquiryContainer";
import SelectBidContainer from "./components/enquiry/Shipper/SelectBidContainer";
import { UserContext } from "./contextAPI/UserContext";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, {
    user: {},
    serverError: {},
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(startGetMarketList());
    if (localStorage.getItem("token")) {
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

        const userRole = jwtDecode(localStorage.getItem("token")).role;

        switch (userRole) {
          case "owner":
            dispatch(startGetVehicle());
            dispatch(startGetMyBid());
            dispatch(startGetAllMyShipments());
            dispatch(startPermitList());
            dispatch(startVehicleType());

            break;

          case "shipper":
            dispatch(startGetMyEnquiries());
            dispatch(startGetAllMyShipments());
            dispatch(startVehicleType());

            break;

          default:
            break;
        }
      } catch (e) {
        console.error(e);
      }
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
              <Route path="/" element={<MarketContainer />} />
              <Route path="/register" element={<RegisterContainer />} />
              <Route path="/login" element={<LoginContainer />} />
              <Route path="/addvehicle" element={<AddVehicleContainer />} />
              <Route path="/market/:id" element={<EnquiryContainer />} />
              <Route path="/addenquiry" element={<AddEnquiryContainer />} />
              <Route path="/mybids" element={<BidContainer />} />
              <Route path="/myenquiries" element={<MyEnquiryList />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/shipment/:id" element={<ShipmentShowPage />} />
              <Route path="/shipments" element={<ShipmentList />} />
              <Route path="/myvehicle" element={<MyVehicle />} />
              <Route path="/myvehicle/:id" element={<VehicleShowPage />} />
              <Route path="/myenquiries/:id" element={<SelectBidContainer />} />
            </Routes>
          </Container>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
