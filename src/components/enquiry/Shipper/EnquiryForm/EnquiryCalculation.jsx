import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const EnquiryCalculation = ({ handleCalculation }) => {
  const enquiryCalculation = useSelector(
    (state) => state.enquiry.enquiryCalculation
  );
  return (
    <>
      <Grid item xs={12}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          onClick={handleCalculation}
        >
          {isEmpty(enquiryCalculation)
            ? "Calculate Enquiry Amount"
            : "Recalculate the Enquiry "}
        </Button>
      </Grid>
    </>
  );
};

export default EnquiryCalculation;
