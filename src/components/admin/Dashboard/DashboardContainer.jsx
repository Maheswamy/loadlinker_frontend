import React from "react";
import DetailBox from "./DetailBox";
import MapContainer from "./MapContainer";
import QueryContainer from "./QueryContainer";
import { Stack } from "@mui/material";

const DashboardContainer = () => {
  return (
    <>
      <QueryContainer />
      <Stack direction={'row'} justifyContent={'space-between'}>
        <DetailBox
          heading={"Total shipment"}
          info={300}
          alt={"shipment-icon"}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-shipment-50.png"
          }
        />
        <DetailBox
          heading={"Total Enquiry"}
          info={300}
          alt={"Enquiry-icon"}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-questions-50.png"
          }
        />
        <DetailBox
          heading={"Total Vehicle"}
          info={300}
          alt={"truckSide-icon"}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-semi-truck-side-view-50.png"
          }
        />
        <DetailBox
          heading={"Total Number of Bids"}
          info={300}
          alt={"bid-icon"}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-bid-50.png"
          }
        />
        <DetailBox
          heading={"Total Revenue"}
          info={3000000}
          alt={"revenue-icon"}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-get-revenue-50.png"
          }
        />
      </Stack>
      <MapContainer />
    </>
  );
};

export default DashboardContainer;
