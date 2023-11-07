import { Paper, Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper sx={{ width: "4", padding: "20px" }}>
      <Stack gap={2}>
        <TextField
          id="username"
          label="Email or Number"
          variant="outlined"
          value={username}
          size='small'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          id="password-login"
          label="Password"
          variant="outlined"
          value={password}
          size='small'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" size="small">
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
        >
          don't have an account?
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
