import React from "react";
import { useContext } from "react";
import { UserContext } from "./../../contextAPI/UserContext";
import {
  Typography,
  Paper,
  Stack,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";

const ProfileInfo = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;

  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "20px" }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              First Name:
            </Typography>
            <TextField
              id="first-name"
              fullWidth
              value={user.firstName}
              disabled
              variant="outlined"
            />
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ padding: "20px", marginTop: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              Last Name:
            </Typography>
            <TextField
              id="last-name"
              fullWidth
              value={user.lastName}
              disabled
              variant="outlined"
            />
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ padding: "20px", marginTop: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              Email:
            </Typography>
            <TextField
              id="email"
              fullWidth
              value={user.email}
              disabled
              variant="outlined"
            />
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ padding: "20px", marginTop: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              Mobile Number:
            </Typography>
            <TextField
              id="mobile-number"
              fullWidth
              value={user.mobileNumber}
              disabled
              variant="outlined"
            />
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ padding: "20px", marginTop: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              Account Verification:
            </Typography>
            <TextField
              id="account-verification"
              fullWidth
              value={user.isVerified ? "Verified" : "Not Verified"}
              disabled
              variant="outlined"
            />
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
