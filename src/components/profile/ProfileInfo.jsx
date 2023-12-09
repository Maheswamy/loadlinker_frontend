import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "./../../contextAPI/UserContext";
import { isEmail } from "validator";
import {
  Typography,
  Paper,
  Stack,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";

const ProfileInfo = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { user } = userState;

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobileNumber: user.mobileNumber,
  };
  const [formData, setFormData] = useState(initialState);
  const [disableValue, setDisable] = useState(true);
  const [formError, setFormError] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [serverError, setServerError] = useState({});

  const errors = {};

  const handleEdit = () => {
    setDisable(false);
  };

  const runValidation = () => {
    const { firstName, lastName, email, mobileNumber } = formData;
    if (firstName.trim().length == 0) {
      errors.firstName = "First Name is required";
    }
    if (email.trim().length === 0) {
      errors.email = "email is required";
    } else if (!isEmail(email)) {
      errors.email = "invalid email";
    }

    if (mobileNumber.trim().length === 0) {
      errors.mobileNumber = "Mobile Number is required";
    } else if (mobileNumber.length !== 10) {
      errors.mobileNumber = "invalid mobile number";
    }
    setFormError(errors);
    return Object.keys(errors).length;
  };

  const submitEdit = async () => {
    const validationResult = runValidation();
    if (!validationResult) {
      try {
        setSpinner(true);
        const updateProfileResponse = await axios.put(
          "/api/users/profile",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        userDispatch({
          type: "USER_UPDATE",
          payload: updateProfileResponse.data,
        });
        toastHandler(updateProfileResponse.data);
        setDisable(true);
        setSpinner(false);
      } catch (e) {
        if (e.response.status === 400) {
          setServerError(e.response.data);
          setSpinner(false);
        } else if (e.response.status === 500) {
          alert(e.response.statusText);
          setSpinner(false);
        }
      }
    }
  };

  const toastHandler = (user) => {
    return toast.success(
      `Profile Info Updated ${user?.firstName} ${user?.lastName}`,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  const cancleEdit = () => {
    setDisable(true);
    setFormData(initialState);
  };

  useEffect(() => {
    setFormData(initialState);
  }, [user]);

  const handleEditChanges = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Grid container spacing={3}>
      <ToastContainer />
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ padding: "20px" }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color="text">
              First Name:
            </Typography>
            <TextField
              id="first-name"
              fullWidth
              value={formData.firstName}
              disabled={disableValue}
              variant="outlined"
              name="firstName"
              onChange={(e) => handleEditChanges(e)}
              error={formError?.firstName || (serverError?.firstName && true)}
              helperText={formError?.firstName || serverError?.firstName}
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
              value={formData.lastName}
              disabled={disableValue}
              variant="outlined"
              name="lastName"
              onChange={(e) => handleEditChanges(e)}
              error={formError?.lastName || (serverError?.lastName && true)}
              helperText={formError?.lastName || serverError?.lastName}
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
              value={formData.email}
              disabled={disableValue}
              variant="outlined"
              name="email"
              onChange={(e) => handleEditChanges(e)}
              error={formError?.email || (serverError?.email && true)}
              helperText={formError?.email || serverError?.email}
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
              value={formData.mobileNumber}
              disabled={disableValue}
              variant="outlined"
              name="mobileNumber"
              onChange={(e) => handleEditChanges(e)}
              error={
                formError?.mobileNumber || (serverError?.mobileNumber && true)
              }
              helperText={formError?.mobileNumber || serverError?.mobileNumber}
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
        <Stack spacing={2}>
          {disableValue ? (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleEdit}
            >
              Edit
            </Button>
          ) : (
            <Stack justifyContent={"center"} spacing={3} alignItems={"center"}>
              {spinner ? (
                <CircularProgress />
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={cancleEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={submitEdit}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
