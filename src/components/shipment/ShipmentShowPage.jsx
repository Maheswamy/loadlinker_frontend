import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import EnquiryDetail from "../enquiry/common/EnquiryDetail";
import MapLiveLocation from "./MapLiveLocation";
import ShipmentActionPage from "./ShipmentActionPage";
import { startUpdatePayment } from "../../redux/action/shipmentAction";

import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const ShipmentShowPage = () => {
  const [position, setPosition] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myShipments } = useSelector((state) => state.shipment);
  const shipment = myShipments.find((ele) => ele?._id === id) || {};
  const { bidId = {}, enquiryId = {}, status, payment ,review } = shipment;
  const socket = io("http://localhost:3080");
 
  useEffect(() => {
    if (jwtDecode(localStorage.getItem("token")).role === "owner"&&status!=='unloaded') {
      if (socket?.connect) {
        socket.emit("join_room", id);
      }

      navigator.geolocation.watchPosition(
        (position) => {
          socket.emit("position", {
            shipmentId: id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      //Accessing live location
    } else {
      socket.emit("join_room", {
        shipmentId: id,
      });
      socket.on("driver_position", (data) => {
        console.log(data, "shippper");
        setPosition([data.latitude, data.longitude]);
      });
    }
  }, []);

  useEffect(() => {
    if (jwtDecode(localStorage.getItem("token")).role === "owner") {
      console.log(position, "owner");
    } else {
      console.log(position, "shipper");
    }
  }, [position]);

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search).get(
      "payment"
    );
    if (queryString === "success") {
      const formData = {
        shipmentId: id,
        transactionId: localStorage.getItem("transactionId"),
      };
      dispatch(startUpdatePayment(formData));
    }
  }, [dispatch, id]);

  const details = {
    bidAmount: bidId.bidAmount,
    vehicleNumber: bidId.vehicleId?.vehicleNumber,
    amount: enquiryId.amount,
    dropOffLocation: enquiryId.dropOffLocation,
    pickUpLocation: enquiryId.pickUpLocation,
    dateOfPickUp: enquiryId.dateOfPickUp,
    dateOfUnload: enquiryId.dateOfUnload,
    loadType: enquiryId.loadType,
    loadWeight: enquiryId.loadWeight,
    paymentType: enquiryId.paymentType,
    payment: payment,
    status,
    
  };

  return (
    <Grid container spacing={2}>
      {myShipments.length > 0 && (
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* <Map drag={false} coordinates={coordinates} routing={false} /> */}
            <MapLiveLocation position={position} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EnquiryDetail {...details} />
            <ShipmentActionPage
              status={status}
              shipmentId={id}
              amount={bidId.bidAmount}
              payment={payment}
              review={review}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ShipmentShowPage;
