import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import EnquiryDetail from "../enquiry/common/EnquiryDetail";
import Map from "./../enquiry/common/Map";
import ShipmentActionPage from "./ShipmentActionPage";
import { startUpdatePayment } from "../../redux/action/shipmentAction";

const ShipmentShowPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myShipments } = useSelector((state) => state.shipment);
  const shipment = myShipments.find((ele) => ele?._id === id) || {};
  const { bidId = {}, enquiryId = {}, status } = shipment;

  const coordinatesObj = enquiryId.coordinates || {};
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];

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
    dropUpLocation: enquiryId.dropUpLocation,
    pickUpLocation: enquiryId.pickUpLocation,
    dateOfPickUp: enquiryId.dateOfPickUp,
    dateOfUnload: enquiryId.dateOfUnload,
    loadType: enquiryId.loadType,
    loadWeight: enquiryId.loadWeight,
    paymentType: enquiryId.paymentType,
    status,
  };

  return (
    <Grid container spacing={2}>
      {myShipments.length > 0 && (
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <Map drag={false} coordinates={coordinates} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EnquiryDetail {...details} />
            <ShipmentActionPage
              status={status}
              shipmentId={id}
              amount={bidId.bidAmount}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ShipmentShowPage;
