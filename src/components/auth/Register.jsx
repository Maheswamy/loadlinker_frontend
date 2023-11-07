import {
  Paper,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { isEmail, isStrongPassword } from "validator";

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
  const errors = {};

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

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(role, firstName, lastName, email, password, confirmPassword);
    const result = validation();
    console.log(errors);
    if (result === 0) {
      setFormError({});
    }
  };

  return (
    <Paper variant="elevation" sx={{ width: "4", padding: "20px" }}>
      <form onSubmit={handleRegister}>
        <Stack gap={2} type="form">
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            error={fromError.firstName}
            helperText={fromError.firstName && fromError.firstName}
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
            error={fromError.email}
            helperText={fromError.email && fromError.email}
          />
          <TextField
            id="mobileNumber"
            label="Phone Number"
            variant="outlined"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            size="small"
            error={fromError.mobileNumber}
            helperText={fromError.mobileNumber && fromError.mobileNumber}
          />
          <TextField
            type="password"
            id="password-register"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            error={fromError.password}
            helperText={fromError.password && fromError.password}
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
            helperText={fromError.confirmPassword && fromError.confirmPassword}
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
          {fromError.role && (
            <p style={{ color: "red", marginTop: "-10px" }}>{fromError.role}</p>
          )}
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
          >
            already have an account?
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Register;
