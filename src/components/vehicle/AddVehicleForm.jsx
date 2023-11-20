import React, { useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  Paper,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FilePond, registerPlugin } from "react-filepond";
import { isMongoId } from "validator";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  startPermitList,
  startVehicleType,
  startAddVehicle,
} from "../../redux/action/vehicleAction";
import ReactSelect from "./ReactSelect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

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
  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const errors = {};
    const navigate=useNavigate()
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicle);

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

  const handleRcFileUpload = (rc) => {
    console.log(rc);
    setRc(rc.map((ele) => ele.file));
  };
  const handleVehicleFileUpload = (vehicleImage) => {
    console.log(vehicleImage);
    setVehicleImage(vehicleImage.map((ele) => ele.file));
  };
  const getSelectedPermit = (data) => {
    setSelectedPermit(data);
  };

  const runValidation = () => {
    if (vehicleNumber.trim().length === 0) {
      errors.vehicleNumber = "vehicle number is required";
    }

    if (rcNumber.trim().length === 0) {
      errors.rcNumber = "RC Number is required";
    }

    if (permittedLoadCapacity.trim().length === 0) {
      errors.permittedLoadCapacity = "load capacity of vehicle is required";
    } else if (permittedLoadCapacity.length <= 4) {
      errors.permittedLoadCapacity = "please enter the Load capacity in kgs";
    }

    if (!isMongoId(vehicleType)) {
      errors.vehicleType = "please the vehicle type";
    }
    if (!selectedPermit.length > 0) {
      errors.selectedPermit = "please select the Permit of vehicle";
    }
    if (rc.length !== 2) {
      errors.rc =
        "please upload the front and back side image of vehicle RC document";
    }
    if (vehicleImage.length === 0) {
      errors.vehicleImage =
        "please upload the atleast one image of vehicle RC document";
    } else if (vehicleImage.length > 5) {
      errors.vehicleImage = "maximum five images are required of vehicle";
    }

    setFormError(errors);
    return errors;
  };
  const handleAddVehicle = (e) => {
    e.preventDefault();
    const validationResult = runValidation();
    if (isEmpty(validationResult)) {
      setFormError({});
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
      dispatch(startAddVehicle(body,navigate));
    }
  };
  return (
    <Box width="7">
      <Typography variant="h5">Add Vehicle</Typography>
      <Stack component="form" onSubmit={handleAddVehicle} gap={2}>
        <TextField
          id="vehicleNumber"
          label="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          error={formError.vehicleNumber && true}
          helperText={formError.vehicleNumber}
        />
        <TextField
          id="rcNumber"
          label="RC Number"
          value={rcNumber}
          onChange={(e) => setRcNumber(e.target.value)}
          error={formError.rcNumber && true}
          helperText={formError.rcNumber}
        />
        <TextField
          id="permittedLoadCapacity"
          label="maximum weight Capacity vehicle in kgs"
          value={permittedLoadCapacity}
          type="number"
          onChange={(e) => setPermittedLoadCapacity(e.target.value)}
          error={formError.permittedLoadCapacity && true}
          helperText={formError.permittedLoadCapacity}
        />

        {/* <InputLabel id="vehcile-Type-label">Vehicle Type</InputLabel> */}
        <Select
          id="vehicle-Type-select"
          value={vehicleType}
          label="Vehicle type"
          onChange={(e) => setVehicleType(e.target.value)}
          error={formError.vehicleType && true}
          helperText={formError.vehicleType}
        >
          <MenuItem value="">
            <Typography>None</Typography>
          </MenuItem>
          {vehicle.vehicleType.map((ele) => (
            <MenuItem value={ele._id} key={ele._id}>
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
            name="rc"
            labelIdle='Drag & Drop your front and back side RC images here or <span class="filepond--label-action">Browse</span>'
          />
        </Box>
        <Box>
          <FilePond
            files={vehicleImage}
            onupdatefiles={handleVehicleFileUpload}
            allowMultiple={true}
            maxFiles={5}
            name="vehicleImage"
            labelIdle='Drag & Drop your vehicle Images, maximum 5 here or <span class="filepond--label-action">Browse</span>'
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Add Vehicle
        </Button>
      </Stack>
    </Box>
  );
};

export default AddVehicleForm;
