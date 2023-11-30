import React, { useContext, useEffect, useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contextAPI/UserContext";
import {
  startGetVehicle,
  startPermitList,
  startVehicleType,
} from "../../redux/action/vehicleAction";
import { startGetMyBid } from "../../redux/action/bidAction";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { startGetMyEnquiries } from "../../redux/action/enquiryAction";
import { startGetAllMyShipments } from "../../redux/action/shipmentAction";
import { startGetCount } from "../../redux/action/marketAction";
import { startGetReviews } from "./../../redux/action/reviewAction";

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  const dispatch = useDispatch();

  const validateField = (value, type) => {
    if (value.trim().length === 0) {
      return `${type} is required`;
    } else if (type === "username") {
      if (value.includes(".")) {
        return isEmail(value) ? null : "Invalid email";
      } else {
        return value.length === 10 ? null : "Invalid mobile number";
      }
    }
    return null;
  };

  const validation = () => {
    const errors = {
      username: validateField(username, "username"),
      password: validateField(password, "password"),
    };

    setFormError(errors);
    return Object.values(errors).every((error) => error === null);
  };

  const handleLogIn = async (e) => {
    setServerError({});
    e.preventDefault();

    if (validation()) {
      const body = { username, password };

      try {
        const loginResponse = await axios.post("/api/login", body);
        localStorage.setItem("token", loginResponse.data.token);
        const userResponse = await axios.get("/api/users/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (jwtDecode(localStorage.getItem("token")).role === "owner") {
          dispatch(startVehicleType());
          dispatch(startGetVehicle());
          dispatch(startGetMyBid());
          dispatch(startPermitList());
          dispatch(startGetAllMyShipments());
          dispatch(startGetCount());
          dispatch(startGetReviews());
        }
        if (jwtDecode(localStorage.getItem("token")).role === "shipper") {
          dispatch(startGetMyEnquiries());
          dispatch(startGetAllMyShipments());
          dispatch(startVehicleType());
          dispatch(startGetCount());
          dispatch(startGetReviews());
        }

        if (jwtDecode(localStorage.getItem("token")).role === "admin") {
          dispatch(startGetAllMyShipments());
          dispatch(startGetCount());
          dispatch(startGetMyEnquiries());
          dispatch(startGetVehicle());
        }

        userDispatch({
          type: "USER_LOGIN",
          payload: userResponse.data.userData,
        });
        navigate("/");
      } catch (e) {
        if (e.response.data.error.includes("verify")) {
          return toast.error("Please verify your account before SignIn", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        setServerError({
          username: e.response.data.error,
          password: e.response.data.error,
        });
      }
    }
  };

  return (
    <form onSubmit={handleLogIn} style={styles.form}>
      <ToastContainer />
      <Stack gap={2} type="form">
        <Typography variant="h2" color="text">
          Log In
        </Typography>
        <TextField
          id="username"
          label="Email or Number"
          variant="outlined"
          value={username}
          size="small"
          onChange={(e) => setUsername(e.target.value)}
          error={formError.username || (serverError.username && true)}
          helperText={formError.username || serverError.username}
        />
        <TextField
          type="password"
          id="password-login"
          label="Password"
          variant="outlined"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          error={formError.password || (serverError.username && true)}
          helperText={formError.password || serverError.password}
        />

        <Button variant="contained" color="primary" size="small" type="submit">
          Log In
        </Button>
        <Button
          variant="text"
          size="small"
          sx={{
            "&:hover": {
              backgroundColor: "inherit",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Don't have an account?
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
