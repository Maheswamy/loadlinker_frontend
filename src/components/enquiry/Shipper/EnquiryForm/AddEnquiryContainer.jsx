import { Grid } from "@mui/material";
import AddEnquiryForm from "./AddEnquiryForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from "./../../common/Map";
import { deleteCalculate } from "../../../../redux/action/enquiryAction";

const AddEnquiryConatiner = () => {
  const dispatch = useDispatch();
  const { pickUpLocation, dropOffLocation, distanceAndDuration } = useSelector(
    (state) => state.enquiry.enquiryCalculation
  );
  const pickUpCoordinate = [pickUpLocation?.lat, pickUpLocation?.lng];
  const dropOffCoordinate = [dropOffLocation?.lat, dropOffLocation?.lng];
    console.log(pickUpCoordinate,dropOffCoordinate)
 
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Map coordinates={[pickUpCoordinate, dropOffCoordinate]} drag={true} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddEnquiryForm />
      </Grid>
    </Grid>
  );
};

export default AddEnquiryConatiner;
