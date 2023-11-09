import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const errors = {};
  const navigate = useNavigate();

  const validation = () => {
    if (username.includes("@")) {
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

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log("kkld");
    const validationResult = validation();
    if (validationResult === 0) {
      console.log(username, password);
    }
  };
  return (
    <form onSubmit={handleLogIn}>
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
          error={fromError.username && true}
          helperText={fromError.username && fromError.username}
        />
        <TextField
          type="password"
          id="password-login"
          label="Password"
          variant="outlined"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          error={fromError.password && true}
          helperText={fromError.password && fromError.password}
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
