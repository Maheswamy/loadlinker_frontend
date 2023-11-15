import { Grid } from "@mui/material";
import AddEnquiryForm from "./AddEnquiryForm";
import Map from "../common/Map";
import { useSelector } from "react-redux";

const AddEnquiryConatiner = () => {
  const { pickUpCoordinate, dropCoordinate, distanceAndDuration } = useSelector(
    (state) => state.enquiry.enquiryCalculation
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Map coordinates={[pickUpCoordinate, dropCoordinate]} drag={true}/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddEnquiryForm />
        
      </Grid>
    </Grid>
  );
};

export default AddEnquiryConatiner;
