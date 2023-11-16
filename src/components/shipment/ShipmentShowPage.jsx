import { useParams } from "react-router-dom";
import EnquiryDetail from "../enquiry/common/EnquiryDetail";
import Map from "./../enquiry/common/Map";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ShipmentAction from "./ShipmentAction";

const ShipmentShowPage = () => {
  const { id } = useParams();
  const { bidId, enquiryId, status } = useSelector((state) =>
    state.shipment.myShipments.find((ele) => ele._id === id)
  );
  const details = {
    bidAmount: bidId.bidAmount,
    vehicleNumber: bidId.vehicleId.vehicleNumber,
    amount: enquiryId.amount,
    dropUpLocation: enquiryId.dropUpLocation,
    pickUpLocation: enquiryId.pickUpLocation,
    loadType: enquiryId.loadType,
    loadWeight: enquiryId.loadWeight,
    paymentType: enquiryId.paymentType,
    status,
  };
  const coordinatesObj = enquiryId.coordinates;
  const coordinates = [
    coordinatesObj?.pickUpCoordinate,
    coordinatesObj?.dropCoordinate,
  ];
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Map drag={false} coordinates={coordinates} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EnquiryDetail {...details} />
          <ShipmentAction status={status}/>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default ShipmentShowPage;
