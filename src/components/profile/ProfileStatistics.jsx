import React, { useContext } from "react";
import DetailBox from "./../admin/Dashboard/DetailBox";
import { jwtDecode } from "jwt-decode";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { UserContext } from "./../../contextAPI/UserContext";

const ProfileStatistics = () => {
  const { userState } = useContext(UserContext);
  const { myShipments } = useSelector((state) => state.shipment);
  const { myVehicle } = useSelector((state) => state.vehicle);

  const role = jwtDecode(localStorage.getItem("token")).role;
  return (
    <Stack direction={"row"} alignItems={'center'} justifyContent={'space-around'}>
      <DetailBox
        heading={"Total shipment"}
        info={myShipments?.length}
        alt={"shipment-icon"}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-shipment-50.png"
        }
      />
      {role === "owner" && (
        <DetailBox
          heading={"Total Vehicle"}
          alt={"truckSide-icon"}
          info={myVehicle?.length}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-semi-truck-side-view-50.png"
          }
        />
      )}
      {role === "shipper" && (
        <DetailBox
          heading={"Average bids per Enquiry"}
          alt={"bid-icon"}
          info={userState?.user?.bidsPerEnquiry}
          image={
            "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-bid-50.png"
          }
        />
      )}
      <DetailBox
        heading={"Total Revenue"}
        alt={"revenue-icon"}
        info={userState?.user?.revenue}
        amount={true}
        image={
          "https://loadlinker.s3.ap-south-1.amazonaws.com/frontend_images/icons8-get-revenue-50.png"
        }
      />
    </Stack>
  );
};

export default ProfileStatistics;
