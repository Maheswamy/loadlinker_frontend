import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EnquiryDetail from "./EnquiryDetail";
import { useDispatch, useSelector } from "react-redux";
import { startGetSingleEnquiry } from "../../redux/action/marketAction";
import BidForm from "./BidForm";
import BidList from "./BidList";

const Enquirycontainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetSingleEnquiry(id));
  }, []);
  const enquiry = useSelector((state) => state.market.singleEnquiry);

  return (
    <Box>
      <Stack container="true" direction="row">
        <Stack >
          <EnquiryDetail {...enquiry} />
        </Stack>
        <Stack>
          <BidForm id={id} />
        </Stack>
      </Stack>
      <BidList />
    </Box>
  );
};

export default Enquirycontainer;
