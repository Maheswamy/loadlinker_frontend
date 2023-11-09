import {
  Paper,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "./../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [fromError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const errors = {};
  const navigate = useNavigate();

  const validation = () => {
    if (firstName.trim().length === 0) {
      errors.firstName = "first name is required";
    }
    if (email.trim().length === 0) {
      errors.email = "email is required";
    } else if (!isEmail(email)) {
      errors.mail = "invalid email";
    }

    if (mobileNumber.trim().length === 0) {
      errors.mobileNumber = "Mobile Number is required";
    } else if (mobileNumber.length !== 10) {
      errors.mobileNumber = "invalid mobile number";
    }

    if (password.trim().length === 0) {
      errors.password = "password is  required";
    } else if (!isStrongPassword(password)) {
      errors.password =
        "password is strong enough min 1 symbol, Uppercase,lowercase ,number";
    }

    if (confirmPassword.trim().length === 0) {
      errors.confirmPassword = "password is  required";
    } else if (!isStrongPassword(confirmPassword)) {
      errors.confirmPassword =
        "password is strong enough min 1 symbol, Uppercase,lowercase ,number";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password is not matching";
    }

    if (!["owner", "shipper"].includes(role)) {
      errors.role = "please select role";
    }

    setFormError(errors);
    return Object.keys(errors).length;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationResult = validation();
    if (validationResult === 0) {
      const body = {
        firstName,
        lastName,
        email,
        password,
        role,
        mobileNumber,
      };
      console.log(body);
      setFormError({});
      setServerError({});
      try {
        const registerRespone = await axios.post("/api/register", body);
        localStorage.setItem("email", registerRespone.data.email);
        toast.success("OTP sent your email!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setRegisterSuccess(true);
      } catch (e) {
        console.log(e.response.data.errors);
        const serverErrorsArray = e.response.data.errors;
        const serverErrorObject = serverErrorsArray.reduce((pv, cv) => {
          pv[cv.path] = cv.msg;
          return pv;
        }, {});
        setServerError(serverErrorObject);
      }
    }
  };

  const handleOtpVerification = async () => {
    console.log(otp);
    const body = {
      email: localStorage.getItem("email"),
      otp,
    };
    try {
      const otpResponse = await axios.post("/api/register/otp", body);
      toast.success("verification successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setRegisterSuccess(false);
      navigate("/login");
    } catch (e) {
      setServerError(e.response.data.errors)
    }
  };

  return (
    <Box>
      <ToastContainer />

      <form onSubmit={handleRegister}>
        <Stack gap={2} type="form">
          <Typography variant="h2" color="text">
            Register
          </Typography>
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            error={fromError.firstName || (serverError.firstName && true)}
            helperText={fromError.firstName || serverError.firstName}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            size="small"
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            error={fromError.email || (serverError.email && true)}
            helperText={fromError.email || serverError.email}
          />
          <TextField
            id="mobileNumber"
            label="Phone Number"
            variant="outlined"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            size="small"
            error={fromError.mobileNumber || (serverError.mobileNumber && true)}
            helperText={fromError.mobileNumber || serverError.mobileNumber}
          />
          <TextField
            type="password"
            id="password-register"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            error={fromError.password || serverError.password}
            helperText={fromError.password || serverError.password}
          />
          <TextField
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="small"
            error={fromError.confirmPassword}
            helperText={fromError.confirmPassword}
          />

          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel
              value="owner"
              control={<Radio size="small" />}
              label="Vehicle Owner"
              size="small"
            />
            <FormControlLabel
              value="shipper"
              control={<Radio size="small" />}
              label="Shipper"
              size="small"
            />
          </RadioGroup>
          {fromError.role ||
            (serverError.role && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {fromError.role}
              </p>
            ))}
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
          >
            Register
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: "inherit",
              },
            }}
            onClick={() => navigate("/login")}
          >
            already have an account?
          </Button>
        </Stack>
      </form>

      {registerSuccess && (
        <Stack gap={2}>
          <MuiOtpInput
            autoFocus={true}
            length={4}
            value={otp}
            onChange={(value) => setOtp(value)}
          />
          <Button variant="contained" onClick={handleOtpVerification}>
            Submit
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Register;
