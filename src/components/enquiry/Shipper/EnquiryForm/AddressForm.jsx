import { Grid, TextField, Typography, Autocomplete } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddressForm = ({ name, address }) => {
  const [formData, setFormData] = useState({
    address: "",
    area: "",
    district: "",
    country: "",
    pin: "",
    state: "",
  });
  const [formError, setFormError] = useState({});
  const [areaList, setAreaList] = useState({});
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
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
      setFormError((prev) => ({}));
      console.log(pinResponse.data[0].PostOffice[0]);
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
      setFormError((prev) => ({ ...prev, pin: "pin code not found" }));
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
        error={formError?.pin && true}
        helperText={formError?.pin}
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
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Area"
            variant="outlined"
            fullWidth
            margin="normal"
            name="area"
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
      />{" "}
    </Grid>
  );
};

export default AddressForm;
