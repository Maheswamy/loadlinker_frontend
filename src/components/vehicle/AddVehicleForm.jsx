import React, { useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  startPermitList,
  startVehicleType,
  startAddVehicle,
} from "../../redux/action/vehicleAction";
import { isEmpty } from "lodash";
import ReactSelect from "./ReactSelect";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddVehicleForm = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [permittedLoadCapacity, setPermittedLoadCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [rc, setRc] = useState([]);
  const [vehicleImage, setVehicleImage] = useState([]);
  const [selectedVehcileTypeDetails, setSelectedVehcileTypeDetails] = useState(
    {}
  );
  const [selectedPermit, setSelectedPermit] = useState([]);

  const handleRcFileUpload = (rc) => {
    console.log(rc);
    setRc(rc.map((ele) => ele.file));
  };
  const handleVehicleFileUpload = (vehicleImage) => {
    console.log(vehicleImage);
    setVehicleImage(vehicleImage.map((ele) => ele.file));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startVehicleType());
    dispatch(startPermitList());
  }, []);

  useEffect(() => {
    if (vehicleType) {
      const VehicleTypeDetails = vehicle.vehicleType.find(
        (ele) => ele._id === vehicleType
      ).minimumWeight;
      setSelectedVehcileTypeDetails(VehicleTypeDetails);
    }
  }, []);
  const vehicle = useSelector((state) => state.vehicle);

  const getSelectedPermit = (data) => {
    setSelectedPermit(data);
  };

  const handleAddVehicle = (e) => {
    console.log(selectedPermit);
    e.preventDefault();
    const body = new FormData();
    console.log("sdjh");
    body.append("vehicleNumber", vehicleNumber);
    body.append("rcNumber", rcNumber);
    body.append("permittedLoadCapacity", permittedLoadCapacity);
    body.append("vehicleType", vehicleType);
    selectedPermit.forEach((permit, index) => {
      body.append(`permit[${index}]`, permit);
    });

    rc.forEach((file) => {
      body.append(`rc`, file);
    });
    vehicleImage.forEach((file) => {
      body.append(`vehicleImage`, file);
    });
    dispatch(startAddVehicle(body));
  };
  return (
    <Box component="form" onSubmit={handleAddVehicle}>
      <TextField
        id="vehicleNumber"
        label="Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <TextField
        id="rcNumber"
        label="RC Number"
        value={rcNumber}
        onChange={(e) => setRcNumber(e.target.value)}
      />
      <TextField
        id="permittedLoadCapacity"
        label="maximum weight Capacity vehicle in kgs"
        value={permittedLoadCapacity}
        type="number"
        onChange={(e) => setPermittedLoadCapacity(e.target.value)}
      />

      {/* <InputLabel id="vehcile-Type-label">Vehicle Type</InputLabel> */}
      <Select
        id="vehicle-Type-select"
        value={vehicleType}
        label="Vehicle type"
        onChange={(e) => setVehicleType(e.target.value)}
      >
        <MenuItem value="">
          <Typography>None</Typography>
        </MenuItem>
        {vehicle.vehicleType.map((ele) => (
          <MenuItem value={ele._id}>
            <Typography>{ele.name}</Typography>
          </MenuItem>
        ))}
      </Select>
      {/* {!isEmpty(selectedVehcileTypeDetails) && (
        <FormHelperText>
          {selectedVehcileTypeDetails.minimumWeight}kg to{" "}
          {selectedVehcileTypeDetails.maximumWeight}
        </FormHelperText>
      )} */}
      <ReactSelect
        permit={vehicle.permit}
        getSelectedPermit={getSelectedPermit}
      />
      <Box>
        <FilePond
          files={rc}
          onupdatefiles={handleRcFileUpload}
          allowMultiple={true}
          maxFiles={2}
          name="rc" /* sets the file input name, it's filepond by default */
          labelIdle='Drag & Drop your front and back side RC images here or <span class="filepond--label-action">Browse</span>'
        />
      </Box>
      <Box>
        <FilePond
          files={vehicleImage}
          onupdatefiles={handleVehicleFileUpload}
          allowMultiple={true}
          maxFiles={5}
          name="vehicleImage" /* sets the file input name, it's filepond by default */
          labelIdle='Drag & Drop your vehicle Images, maximum 5 here or <span class="filepond--label-action">Browse</span>'
        />
      </Box>
      <Button variant="contained" color="primary" type="submit">
        Add Vehicle
      </Button>
    </Box>
  );
};

export default AddVehicleForm;
