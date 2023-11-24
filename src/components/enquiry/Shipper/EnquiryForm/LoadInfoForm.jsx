import React, { useEffect, useState } from "react";

import { Grid, TextField } from "@mui/material";

const LoadInfoForm = ({ loadInfo, formErrors, serverErrors }) => {
  const [loadWeight, setLoadWeight] = useState("");
  const [loadType, setLoadType] = useState("");

  useEffect(() => {
    loadInfo({ loadWeight, loadType });
  }, [loadWeight, loadType]);
  return (
    <>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          id="Shipment Weight"
          label="Shipment Weight"
          value={loadWeight}
          onChange={(e) => setLoadWeight(e.target.value)}
          margin="normal"
          error={(formErrors?.loadWeight || serverErrors?.loadWeight) && true}
          helperText={formErrors?.loadWeight || serverErrors?.loadWeight}
          type="number"
        />
        <Grid xs={12}>
          <TextField
            size="small"
            fullWidth
            id="Shipment Material"
            label="Shipment Material"
            value={loadType}
            onChange={(e) => setLoadType(e.target.value)}
            margin="normal"
            error={(formErrors?.loadType || serverErrors?.loadType) && true}
            helperText={formErrors?.loadType || serverErrors?.loadType}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoadInfoForm;
