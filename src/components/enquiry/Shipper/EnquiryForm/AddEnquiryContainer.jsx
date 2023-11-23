import { Grid } from "@mui/material";
import AddEnquiryForm from "./AddEnquiryForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map from "./../../common/Map";
import { deleteCalculate } from "../../../../redux/action/enquiryAction";

const AddEnquiryConatiner = () => {
  const dispatch = useDispatch();
  const { pickUpLocation, dropOffLocation } = useSelector(
    (state) => state.enquiry.enquiryCalculation
  );

  useEffect(() => {
    return () => dispatch(deleteCalculate());
  }, []);

  const pickUpCoordinate = [pickUpLocation?.lat, pickUpLocation?.lng];
  const dropOffCoordinate = [dropOffLocation?.lat, dropOffLocation?.lng];

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
