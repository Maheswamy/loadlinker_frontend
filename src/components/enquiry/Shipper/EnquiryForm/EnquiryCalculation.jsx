import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { isEmpty } from "lodash";

const EnquiryCalculation = ({handleCalculation}) => {
    
  return (
    <div>
      

      <Grid item xs={12}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          onClick={handleCalculation}
        >
          Calculate Enquiry Amount
        </Button>
      </Grid>
    </div>
  );
};

export default EnquiryCalculation;
