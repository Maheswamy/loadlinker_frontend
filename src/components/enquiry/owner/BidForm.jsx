import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { UserContext } from "../../../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { startAddBid } from "../../../redux/action/bidAction";
import { useNavigate } from "react-router-dom";

const BidForm = ({ id }) => {
  const [formData, setFormData] = useState({
    bidAmount: "",
    vehicleId: "",
  });

  const [formError, setFormError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myVehicle = useSelector((state) =>
    state.vehicle.myVehicle.filter((ele) => ele.isVerified === "approved")
  );

  const alreadyBidData = useSelector((state) =>
    state.bid.mybids.find((ele) => ele.enquiryId._id == id)
  );

  const runValidation = () => {
    const errors = {};

    if (formData.bidAmount <= 0) {
      errors.bidAmount = "Bid amount should be more than zero";
    }

    if (formData.vehicleId === "") {
      errors.vehicleId = "Please select the vehicle before bidding";
    }

    setFormError(errors);
    console.log(errors);
    return errors;
  };

  const handleBidPost = (e) => {
    e.preventDefault();
    if (isEmpty(runValidation())) {
      const { bidAmount, vehicleId } = formData;
      const postData = {
        enquiryId: id,
        bidAmount: Number(bidAmount),
        vehicleId,
      };
      console.log(postData);
      dispatch(startAddBid(postData, navigate));
    }
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleBidPost}
      alignItems="center"
      justifyContent="center"
      rowGap={1}
      my={2}
    >
      {alreadyBidData ? (
        <Grid>
          <Typography color="primary" variant="h6">
            Your already bided to this enquiry, Biding amount is ₹{" "}
            {alreadyBidData.bidAmount}{" "}
          </Typography>
        </Grid>
      ) : (
        <>
          {myVehicle.length > 0 ? (
            <>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="amount"
                    label="Bid Amount"
                    value={formData.bidAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, bidAmount: e.target.value })
                    }
                    variant="outlined"
                    type="number"
                    fullWidth
                    error={!!formError.bidAmount}
                    helperText={formError.bidAmount}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="vehicle"
                      error={!!formError.vehicleId}
                    >
                      Select your Vehicle
                    </InputLabel>
                    <Select
                      id="vehicle"
                      value={formData.vehicleId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleId: e.target.value,
                        })
                      }
                      label="Select your Vehicle"
                      error={!!formError.vehicleId}
                      fullWidth
                    >
                      <MenuItem value="">Select your vehicle</MenuItem>
                      {myVehicle?.map(({ _id, vehicleNumber }) => (
                        <MenuItem key={_id} value={_id}>
                          {vehicleNumber}
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
            </>
          ) : (
            <Typography color="primary">No vehicle found to bid </Typography>
          )}
        </>
      )}
    </Grid>
  );
};

export default BidForm;
