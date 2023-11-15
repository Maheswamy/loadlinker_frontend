import { Grid, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyEnquiryitem from "./MyEnquiryitem";

const MyEnquirylist = () => {
  
  const enquiries = useSelector((state) => state.enquiry.enquries);
  return (
    <Grid container spacing={2} direction={'column'}>
      {enquiries.map((ele) => (
        <Grid item>
          <MyEnquiryitem {...ele}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyEnquirylist;
