import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { startGetMarketList } from "../../redux/action/marketAction";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MapIcon from "@mui/icons-material/Map";

const SearchMarket = ({ handleView }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loadWeight, setLoadWeight] = useState("");
  const [toggle, setToggle] = React.useState("list");
  const dispatch = useDispatch();
  const vehicleType = useSelector((state) => state.vehicle.vehicleType);

  useEffect(() => {
    if (navigator.geolocation) {
      const handy = async (position) => {
        const { coords } = position;
        try {
          const reverseAddress = await axios.get(
            `https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}`
          );
          console.log(reverseAddress);
          setSource(() => `${reverseAddress.data.address.city}`);
        } catch (e) {
          console.log(e);
        }
      };
      navigator.geolocation.getCurrentPosition(handy);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleToggle = (e) => {
    setToggle(e.target.value);
    handleView();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(source, destination);
    dispatch(startGetMarketList(source, destination, loadWeight));
  };

  const handleClearSearch = () => {
    setSource("");
    setDestination("");
    setLoadWeight("");
    dispatch(startGetMarketList());
  };

  return (
    <Stack
      component="form"
      direction="row"
      spacing={2}
      alignItems="stretch"
      justifyContent={'space-between'}
      onSubmit={handleSubmit}
    >
      <Stack direction="row" spacing={2}>
        <TextField
          id="source"
          label="Pick-Up"
          variant="outlined"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <TextField
          id="destination"
          label="Drop-Off"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </Stack>

      <FormControl fullWidth>
        <InputLabel id="weight">Filter based on load Capacity</InputLabel>
        <Select
          labelId="weight"
          id="demo-simple-select"
          value={loadWeight}
          label="Filter based on load Capacity"
          onChange={(e) => setLoadWeight(e.target.value)}
        >
          <MenuItem value={""}>None</MenuItem>
          {vehicleType.map((ele) => (
            <MenuItem value={ele._id} key={ele._id}>
              {ele.minimumWeight / 1000} Tonne(s)-{ele.maximumWeight / 1000}
              Tonne(s)
            </MenuItem>
          ))}
        </Select >
      </FormControl>

      <Stack direction={'row'} spacing={1}>
        <Button variant="contained" color="primary" type="submit" >
          Search
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleClearSearch}
        >
          Clear Search
        </Button>

        <ToggleButtonGroup
          orientation="horizontal"
          value={toggle}
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="list" color={toggle === "list" && "primary"}>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="map" color={toggle === "map" && "primary"}>
            <MapIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export default SearchMarket;
