import { Grid, TextField, Typography, Autocomplete } from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";

const AddressForm = ({ name, address, formErrors, serverErrors }) => {
  const [formData, setFormData] = useState({
    address: "",
    area: "",
    district: "",
    country: "",
    pin: "",
    state: "",
  });
  const [pinError, setPinError] = useState({});
  const [areaList, setAreaList] = useState({});
  const [value, setValue] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    address(formData);
  }, [formData]);

  const getPinInformation = async () => {
    try {
      const pinResponse = await axios.get(
        `https://api.postalpincode.in/pincode/${formData.pin}`
      );
      setPinError((prev) => ({}));
      const mainDetails = pinResponse.data[0].PostOffice[0];
      setFormData((prev) => {
        return {
          ...prev,
          country: mainDetails.Country,
          district: mainDetails.District,
          state: mainDetails.State,
        };
      });
      setAreaList({
        options: pinResponse.data[0].PostOffice,
        getOptionLabel: (option) => option.Name,
      });
    } catch (e) {
      setPinError((prev) => ({ ...prev, pin: "pin code not found" }));
    }
  };
  return (
    <Grid item xs={6}>
      <Typography variant="p" color="primary.main">
        {name} :
      </Typography>
      <TextField
        size="small"
        label="pin"
        variant="outlined"
        fullWidth
        value={formData?.pin}
        onChange={handleChange}
        onBlur={getPinInformation}
        margin="normal"
        name="pin"
        error={(formErrors?.pin || pinError?.pin || serverErrors?.pin) && true}
        helperText={formErrors?.pin || pinError?.pin || serverErrors?.pin}
      />
      <TextField
        size="small"
        label="Address"
        variant="outlined"
        fullWidth
        value={formData?.address}
        onChange={handleChange}
        margin="normal"
        name="address"
        error={formErrors?.address || (serverErrors?.address && true)}
        helperText={formErrors?.address || serverErrors?.address}
      />
      <Autocomplete
        {...areaList}
        id="auto-complete"
        autoComplete
        includeInputInList
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setFormData({ ...formData, area: newValue?.Name || "" });
        }}
        onInputChange={(event, newInputValue) => {
          setFormData({ ...formData, area: newInputValue });
        }}
        disabled={isEmpty(areaList)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Area"
            variant="outlined"
            fullWidth
            margin="normal"
            name="area"
            error={(formErrors?.area || serverErrors?.state) && true}
            helperText={formErrors?.area || serverErrors?.state}
          />
        )}
      />
      <TextField
        size="small"
        label="District"
        variant="outlined"
        fullWidth
        value={formData?.district}
        onChange={handleChange}
        margin="normal"
        name="district"
        error={(formErrors?.district || serverErrors?.district) && true}
        helperText={formErrors?.district || serverErrors?.district}
      />
      <TextField
        size="small"
        label="State"
        variant="outlined"
        fullWidth
        value={formData?.state}
        onChange={handleChange}
        margin="normal"
        name="state"
        error={(formErrors?.state || serverErrors?.state) && true}
        helperText={formErrors?.state || serverErrors?.state}
      />
      <TextField
        size="small"
        label="Country"
        variant="outlined"
        fullWidth
        value={formData?.country}
        onChange={handleChange}
        margin="normal"
        name="country"
        error={(formErrors?.country || serverErrors?.country) && true}
        helperText={formErrors?.country || serverErrors?.state}
      />{" "}
    </Grid>
  );
};

export default AddressForm;
