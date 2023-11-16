import React from "react";
import Button from "@mui/material/Button";

const ShipmentAction = ({ status }) => {
  return (
    <div>
      {status === "waiting" ? (
        <Button variant="contained" color="primary">
          Cancle
        </Button>
      ) : (
        <Button variant="contained" color="primary">
          MAke Payment
        </Button>
      )}
    </div>
  );
};

export default ShipmentAction;
