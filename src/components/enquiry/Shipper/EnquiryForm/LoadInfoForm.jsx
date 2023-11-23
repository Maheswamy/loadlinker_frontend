import React, { useEffect, useState } from "react";

import { Grid, TextField } from "@mui/material";

const LoadInfoForm = ({ loadInfo }) => {
  const [loadWeight, setLoadWeight] = useState("");
  const [loadType, setLoadType] = useState("");

  useEffect(() => {
    loadInfo({ loadWeight, loadType });
  }, [loadWeight, loadType]);
  return (
    <>
      <TextField
        size="small"
        id="shipmentWeight"
        label="Enter Weight in kg's"
        value={loadWeight}
        fullWidth
        onChange={(e) => setLoadWeight(e.target.value)}
        margin="normal"
        type="number"
      />

      <TextField
        size="small"
        fullWidth
        id="ShipmentMaterial"
        label="Shipment Material"
        value={loadType}
        onChange={(e) => setLoadType(e.target.value)}
        margin="normal"
      />
    </>
  );
};

export default LoadInfoForm;
