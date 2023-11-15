import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { useDispatch,useSelector } from "react-redux";
import { startAddBid } from "../../../redux/action/bidAction";

const BidForm = ({ id }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [formError, setFormError] = useState({});
  const errors = {};
  const dispatch = useDispatch();
  const {myVehicle}=useSelector((state)=>state.vehicle)


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
      console.log(formData);
      dispatch(startAddBid(formData));
    }
  };
  return (
    <Grid
      container
      xs={12}
      component="form"
      onSubmit={handleBidPost}
      alignItems={"center"}
      justifyContent={"center"}
      rowGap={1}
      my={2}
    >
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="amount"
            label="Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            variant="outlined"
            type="number"
            fullWidth
            error={formError.bidAmount && true}
            helperText={formError.bidAmount}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="vehicle" error={formError.vehicleId && true}>
              Select your Vehicle
            </InputLabel>
            <Select
              id="vehicle"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              label="Select your Vehicle"
              error={formError.vehicleId && true}
              fullWidth
            >
              <MenuItem value="">Select your vehicle</MenuItem>
              {myVehicle?.map((ele) => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.vehicleNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid xs={12}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit Bid
        </Button>
      </Grid>
    </Grid>
  );
};

export default BidForm;
