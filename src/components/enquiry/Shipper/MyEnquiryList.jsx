import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyEnquiryitem from "./MyEnquiryitem";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { startGetMyEnquiries } from "../../../redux/action/enquiryAction";

const MyEnquiryList = () => {
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiry.enquries);
  const location = useLocation();
  useEffect(() => {
    dispatch(startGetMyEnquiries());
    if (location.state) {
      toast.success(`${location.state}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);
  return (
    <>
      <ToastContainer />
      {enquiries.length === 0 ? (
        <Typography variant="h6" color="primary">
          No enquires found
        </Typography>
      ) : (
        <Grid container spacing={2} direction={"column"}>
          {enquiries?.map((ele) => (
            <Grid item>
              <MyEnquiryitem {...ele} keys={ele._id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyEnquiryList;
