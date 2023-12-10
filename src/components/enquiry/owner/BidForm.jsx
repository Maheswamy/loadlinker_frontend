import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { UserContext } from "../../../contextAPI/UserContext";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { startAddBid } from "../../../redux/action/bidAction";
import { useNavigate } from "react-router-dom";

const BidForm = ({ id, loadWeight }) => {
  const [formData, setFormData] = useState({
    bidAmount: "",
    vehicleId: "",
  });

  const [formError, setFormError] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myVehicle = useSelector((state) =>
    state.vehicle.myVehicle.filter((ele) => ele.isVerified === "approved")
  );

  const alreadyBidData = useSelector((state) =>
    state.bid.mybids.find((ele) => ele.enquiryId?._id == id)
  );

  const myloadedVehicles = useSelector((state) =>
    state.shipment.myShipments.filter((ele) => ele.status === "loaded")
  );

  const runValidation = () => {
    const errors = {};

    if (formData.bidAmount <= 0) {
      errors.bidAmount = "Bid amount should be more than zero";
    }

    if (formData.vehicleId === "") {
      errors.vehicleId = "Please select the vehicle before bidding";
    } else if (
      myVehicle.find((ele) => ele._id === formData.vehicleId)
        ?.permittedLoadCapacity < loadWeight
    ) {
      errors.vehicleId =
        "Permitted vehicle Capacity is less than the request load Weight";
    } else if (
      myloadedVehicles.find(
        (ele) => ele.bidId.vehicleId._id === formData.vehicleId
      )
    ) {
      errors.vehicleId =
        "selected vehicle is assigned to other Shipment please select the other vehicle";
    }

    setFormError(errors);
    console.log(errors);
    return errors;
  };

  const handleSpinner = (value) => {
    setSpinner(value);
  };

  const handleServerError = (value) => {
    setServerErrors(value);
  };

  const handleBidPost = (e) => {
    e.preventDefault();
    if (isEmpty(runValidation())) {
      handleSpinner(true);
      const { bidAmount, vehicleId } = formData;
      const postData = {
        enquiryId: id,
        bidAmount: Number(bidAmount),
        vehicleId,
      };
      dispatch(
        startAddBid(postData, navigate, handleSpinner, handleServerError)
      );
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
                    error={formError?.bidAmount && true}
                    helperText={formError?.bidAmount}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="vehicle" error={!!formError.vehicleId}>
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
                      error={formError?.vehicleId && true}
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
                  {formError?.vehicleId && (
                    <FormHelperText>{formError?.vehicleId}</FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid xs={12}>
                {spinner ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    fullWidth
                  >
                    Submit Bid
                  </Button>
                )}
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
