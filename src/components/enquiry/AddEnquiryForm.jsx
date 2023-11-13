import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetEnquiryCalculation,
  deleteCalculate,
  startAddEnquiry,
} from "../../redux/action/enquiryAction";
import { isEmpty } from "lodash";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AddEnquiryForm = () => {
  const [pickaddress, setPickAddress] = useState("");
  const [pickarea, setPickArea] = useState("");
  const [pickdistrict, setPickDistrict] = useState("");
  const [pickcountry, setPickCountry] = useState("");
  const [pickpin, setPickPin] = useState("");
  const [pickstate, setPickState] = useState("");
  const [dropaddress, setDropAddress] = useState("");
  const [droparea, setDropArea] = useState("");
  const [dropdistrict, setDropDistrict] = useState("");
  const [dropcountry, setDropCountry] = useState("");
  const [droppin, setDropPin] = useState("");
  const [dropstate, setDropState] = useState("");
  const [loadWeight, setLoadWeight] = useState("");
  const [loadType, setLoadType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formError, setFormError] = useState({});
  const errors = {};

  const dispatch = useDispatch();
  const calculatedEnquiry = useSelector(
    (state) => state.enquiry.enquiryCalculation
  );
  const coordinates = useSelector((state) => state.enquiry.newCoordinates);

  useEffect(() => {
    return () => {
      dispatch(deleteCalculate());
    };
  }, []);

  const runValidation = () => {
    if (loadWeight.trim().length <= 0) {
      errors.loadWeight = "load weight should more zero";
    }
    if (loadType.trim().length == 0) {
      errors.loadType = "load type is required";
    }
    if (pickaddress.trim().length == 0) {
      errors.pickaddress = "address is required";
    }
    if (pickarea.trim().length == 0) {
      errors.pickarea = "area is required";
    }
    if (pickdistrict.trim().length == 0) {
      errors.pickdistrict = "district is required";
    }
    if (pickcountry.trim().length == 0) {
      errors.pickcountry = "country is required";
    }
    if (pickpin.trim().length == 0) {
      errors.pickpin = "pincode is required";
    }
    if (pickstate.trim().length == 0) {
      errors.pickstate = "state is required";
    }

    if (dropaddress.trim().length == 0) {
      errors.dropaddress = "address is required";
    }
    if (droparea.trim().length == 0) {
      errors.droparea = "area is required";
    }
    if (dropdistrict.trim().length == 0) {
      errors.dropdistrict = "district is required";
    }
    if (dropcountry.trim().length == 0) {
      errors.dropcountry = "country is required";
    }
    if (droppin.trim().length == 0) {
      errors.droppin = "pincode is required";
    }
    if (dropstate.trim().length == 0) {
      errors.dropstate = "state is required";
    }

    setFormError(errors);
    return isEmpty(errors);
  };

  const formData = () => {
    return {
      loadType,
      loadWeight: Number(loadWeight),
      pickUpLocation: {
        address: pickaddress,
        area: pickarea,
        district: pickdistrict,
        state: pickstate,
        country: pickcountry,
        pin: pickpin,
        lat: coordinates?.source.lat ? coordinates?.source.lat : null,
        lng: coordinates?.source.lng ? coordinates?.source.lng : null,
      },
      dropUpLocation: {
        address: dropaddress,
        area: droparea,
        district: dropdistrict,
        state: dropstate,
        pin: droppin,
        country: dropcountry,
        lat: coordinates?.distination.lat ? coordinates?.distination.lat : null,
        lng: coordinates?.distination.lng ? coordinates?.distination.lng : null,
      },
      dateOfPickUp: new Date(startDate).toISOString().split("T")[0],
      dateOfUnload: new Date(endDate).toISOString().split("T")[0],
    };
  };
  const handleAddEnquiry = (e) => {
    e.preventDefault();
    const validationResult = runValidation();

    if (validationResult) {
      setFormError({});
      console.log(formData());
      dispatch(startGetEnquiryCalculation(formData()));
    }
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    console.log(formData());
    dispatch(startAddEnquiry(formData()));
  };

  return (
    <Grid component={"form"} container spacing={2}>
      <Grid item xs={12}>
        <TextField
          size="small"
          id="shipmentWeight"
          label="Enter Weight in kg's"
          fullWidth
          value={loadWeight}
          onChange={(e) => setLoadWeight(e.target.value)}
          margin="normal"
          type="number"
        />
        <TextField
          size="small"
          id="ShipmentMaterial"
          label="Shipment Material"
          fullWidth
          value={loadType}
          onChange={(e) => setLoadType(e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="p" color="primary.main">
          Pickup Address:
        </Typography>
        <TextField
          size="small"
          label="Address"
          variant="outlined"
          fullWidth
          value={pickaddress}
          onChange={(e) => setPickAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Area"
          variant="outlined"
          fullWidth
          value={pickarea}
          onChange={(e) => setPickArea(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="District"
          variant="outlined"
          fullWidth
          value={pickdistrict}
          onChange={(e) => setPickDistrict(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="State"
          variant="outlined"
          fullWidth
          value={pickstate}
          onChange={(e) => setPickState(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Country"
          variant="outlined"
          fullWidth
          value={pickcountry}
          onChange={(e) => setPickCountry(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Pincode"
          variant="outlined"
          fullWidth
          value={pickpin}
          onChange={(e) => setPickPin(e.target.value)}
          margin="normal"
        />{" "}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="p" color="primary.main">
          Drop Address:
        </Typography>
        <TextField
          size="small"
          label="Address"
          variant="outlined"
          fullWidth
          value={dropaddress}
          onChange={(e) => setDropAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Area"
          variant="outlined"
          fullWidth
          value={droparea}
          onChange={(e) => setDropArea(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="District"
          variant="outlined"
          fullWidth
          value={dropdistrict}
          onChange={(e) => setDropDistrict(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="State"
          variant="outlined"
          fullWidth
          value={dropstate}
          onChange={(e) => setDropState(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Country"
          variant="outlined"
          fullWidth
          value={dropcountry}
          onChange={(e) => setDropCountry(e.target.value)}
          margin="normal"
        />
        <TextField
          size="small"
          label="Pincode"
          variant="outlined"
          fullWidth
          value={droppin}
          onChange={(e) => setDropPin(e.target.value)}
          margin="normal"
        />
      </Grid>
      {!isEmpty(calculatedEnquiry) && (
        <Grid container item justifyContent={"space-evenly"}>
          <Typography variant="h6" color="initial">
            Distance:{" "}
            {Math.round(calculatedEnquiry.distanceAndDuration.distance)} kms
          </Typography>
          <Typography variant="h6" color="initial">
            Amount: {calculatedEnquiry.shippingAmount}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          onClick={handleAddEnquiry}
        >
          {isEmpty(calculatedEnquiry)
            ? "Calculate Enquiry Amount"
            : "Recalculate the Amount"}
        </Button>
      </Grid>
      {!isEmpty(calculatedEnquiry) && (
        <Grid container item xs={12}>
          <Grid
            container
            item
            sx={12}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Grid item sx={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    label="Pickup date"
                    sx={{ backgroundColor: "white" }}
                    disablePast
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    label="Drop date"
                    sx={{ backgroundColor: "white" }}
                    disablePast
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 16 }}
              onClick={handleSubmitEnquiry}
            >
              Submit Enquiry
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AddEnquiryForm;
