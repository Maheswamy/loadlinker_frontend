import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contextAPI/UserContext";
import { startGetVehicle } from "../../redux/action/vehicleAction";
import { startGetMyBid } from "../../redux/action/bidAction";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { startGetMyEnquiries } from "../../redux/action/enquiryAction";
import { startGetAllMyShipments } from "../../redux/action/shipmentAction";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const errors = {};
  const navigate = useNavigate();
  const { userState, userDispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const validation = () => {
    console.log(username);
    if (username.includes(".")) {
      console.log("kj");
      if (username.trim().length === 0) {
        errors.username = "email or mobile number is required";
      } else if (!isEmail(username)) {
        errors.username = "invalid email";
      }
    } else {
      if (username.trim().length === 0) {
        errors.username = "Mobile Number is required";
      } else if (username.length !== 10) {
        errors.username = "invalid mobile number";
      }
    }
    if (password.trim().length === 0) {
      errors.password = "password is  required";
    }
    setFormError(errors);
    return Object.keys(errors).length;
  };

  const handleLogIn = async (e) => {
    setServerError({});
    e.preventDefault();
    const validationResult = validation();
    console.log(validationResult);
    if (validationResult === 0) {
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
          dispatch(startGetVehicle());
          dispatch(startGetMyBid());
        }
        if (jwtDecode(localStorage.getItem("token")).role === "shipper") {
          dispatch(startGetMyEnquiries());
          dispatch(startGetAllMyShipments());
        }
        userDispatch({
          type: "USER_LOGIN",
          payload: userResponse.data.userData,
        });
        navigate("/");
      } catch (e) {
        console.log(e.response.data);
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
    <form onSubmit={handleLogIn}>
      <ToastContainer />
      <Stack
        gap={2}
        type="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          error={fromError.username || (serverError.username && true)}
          helperText={fromError.username || serverError.username}
        />
        <TextField
          type="password"
          id="password-login"
          label="Password"
          variant="outlined"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          error={fromError.password || (serverError.username && true)}
          helperText={fromError.password || serverError.password}
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
          don't have an account?
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
