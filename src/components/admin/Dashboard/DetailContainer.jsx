import React from "react";
import DetailBox from "./DetailBox";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const DetailContainer = () => {
  const { analysis } = useSelector((state) => state);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ md: "space-between" }}
      alignItems="center"
      spacing={2}
      sx={{ padding: 2 }}
    >
      <DetailBox
        heading={"Total shipment"}
        info={analysis.info.totalShipment}
        alt={"shipment-icon"}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-shipment-50.png"
        }
      />
      <DetailBox
        heading={"Total User"}
        info={analysis.info.totalUser}
        alt={"Enquiry-icon"}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-user-50.png"
        }
      />
      <DetailBox
        heading={"Total Vehicle"}
        info={analysis.info.totalNumberOfVehicle}
        alt={"truckSide-icon"}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-semi-truck-side-view-50.png"
        }
      />
      <DetailBox
        heading={"Average bids per Enquiry"}
        info={analysis.info.averageBidPerEnquiry}
        alt={"bid-icon"}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-bid-50.png"
        }
      />
      <DetailBox
        heading={"Total Revenue"}
        info={analysis.info.totalRevenue}
        alt={"revenue-icon"}
        amount={true}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-get-revenue-50.png"
        }
      />
    </Stack>
  );
};

export default DetailContainer;
