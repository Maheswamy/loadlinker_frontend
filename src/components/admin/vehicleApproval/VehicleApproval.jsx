import { useSelector } from "react-redux";
import VehicleItem from "./VehicleItem";
import { Stack, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
const VehicleApproval = () => {
  const { myVehicle } = useSelector((state) => state.vehicle);
  console.log(myVehicle, "vehicle list for approval");
  const showToastMessage = (msg) => {
    toast.success(`${msg}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <>
      <Stack spacing={3}>
        <ToastContainer />
        {myVehicle.length > 0 ? (
          <>
            {myVehicle
              .filter((ele) => ele.isVerified === "pending")
              .map((ele) => (
                <VehicleItem
                  {...ele}
                  key={ele._id}
                  showToastMessage={showToastMessage}
                />
              ))}
          </>
        ) : (
          <Typography variant="h6" color="primary">
            No Vehicle's for Approve
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default VehicleApproval;
