import { Stack, TextField, Button, Select, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "./../../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { startAddBid } from "../../redux/action/bidAction";

const BidForm = ({ id }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [formError, setFormError] = useState({});
  const errors = {};
  const dispatch = useDispatch();
  const { userState } = useContext(UserContext);
  const { vehicles } = userState.user;

  const runValidation = () => {
    if (bidAmount <= 0) {
      errors.bidAmount = "Bid amount  should be more than zero";
    }
    if (vehicleId == "") {
      errors.vehicleId = "please select the vehicle befor biding";
    }

    setFormError(errors);
    console.log(errors);
    return errors;
  };
  const handleBidPost = (e) => {
    e.preventDefault();
    if (isEmpty(runValidation())) {
      const formData = {
        enquiryId: id,
        bidAmount: Number(bidAmount),
        vehicleId,
      };
      console.log(formData)
      dispatch(startAddBid(formData));
    }
  };
  return (
    <Stack component="form" onSubmit={handleBidPost}>
      <TextField
        id="amount"
        label="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        variant="outlined"
        type="number"
        error={formError.bidAmount && true}
        helperText={formError.bidAmount}
      />
      <Select
        id="demo-simple-select"
        value={vehicleId}
        label="Age"
        error={formError.vehicleId && true}
        onChange={(e) => setVehicleId(e.target.value)}
      >
        <MenuItem value="">Select your vehicle</MenuItem>
        {vehicles?.map((ele) => (
          <MenuItem value={ele._id}>{ele.vehicleNumber}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" type="submit" size="large">
        Submit Bid
      </Button>
    </Stack>
  );
};

export default BidForm;
