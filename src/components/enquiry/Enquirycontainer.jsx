import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EnquiryDetail from "./EnquiryDetail";
import { useDispatch, useSelector } from "react-redux";
import { startGetSingleEnquiry } from "../../redux/action/marketAction";

const Enquirycontainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const enquiry = useSelector((state) => state.singleEnquiry);

  useEffect(() => {
    dispatch(startGetSingleEnquiry(id));
  }, []);

  return (
    <Box>
      <EnquiryDetail {...enquiry} />
    </Box>
  );
};

export default Enquirycontainer;
