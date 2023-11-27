import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import EnquiryDetail from "../enquiry/common/EnquiryDetail";
import Map from "./../enquiry/common/Map";
import ShipmentActionPage from "./ShipmentActionPage";
import { startUpdatePayment } from "../../redux/action/shipmentAction";

import io from "socket.io-client";

const ShipmentShowPage = () => {
  const [socket, setSocket] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myShipments } = useSelector((state) => state.shipment);
  const shipment = myShipments.find((ele) => ele?._id === id) || {};
  const { bidId = {}, enquiryId = {}, status, payment } = shipment;

  const coordinatesObj = enquiryId.coordinates || {};
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const newSocket = io.connect("http://localhost:3080");
     
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to server");
      });

      socket.on("disconnect", () => {
        console.log("disconnected from server");
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }
  }, [socket, id]);

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

  const state = useSelector((state) => state.shipment);
  console.log(state, "jsagdahgsdas");
  return (
    <Grid container spacing={2}>
      {myShipments.length > 0 && (
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Map drag={false} coordinates={coordinates} routing={false}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <EnquiryDetail {...details} />
            <ShipmentActionPage
              status={status}
              shipmentId={id}
              amount={bidId.bidAmount}
              payment={payment}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ShipmentShowPage;
