import React from "react";
import { useContext } from "react";
import { UserContext } from "./../../contextAPI/UserContext";
import Typography from "@mui/material/Typography";

const ProfileInfo = () => {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  return (
    <div>
      <Typography variant="body1" color="text">
        First Name
      </Typography>
      <Typography variant="body1" color="text">
        {user.firstName}
      </Typography>
      <Typography variant="body1" color="text">
        Last Name:
      </Typography>
      <Typography variant="body1" color="text">
        {user.lastName}
      </Typography>
      <Typography variant="body1" color="text">
        email:
      </Typography>
      <Typography variant="body1" color="text">
        {user.email}
      </Typography>
      <Typography variant="body1" color="text">
        mobile number:
      </Typography>
      <Typography variant="body1" color="text">
        {user.mobileNumber}
      </Typography>
      <Typography variant="body1" color="text">
        account Verification:
      </Typography>
      <Typography variant="body1" color="text">
        {user.isVerified?'Verified':"Not Verified"}
      </Typography>
      {user.vehicles.length > 0 && <ul>
        {user.vehicles.map((ele)=><li key={ele}>{ele}</li>)}
        </ul>}
    </div>
  );
};

export default ProfileInfo;
