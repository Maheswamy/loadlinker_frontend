import axios from "../../config/axios";
import { removeEnquiry } from "./enquiryAction";
import { removeEnquiryFromMarket } from "./marketAction";

export const startApproveBid = (bidId, enquiryId, navigate) => {
  return async (dispatch) => {
    try {
      const bidApprovalResponse = await axios.post(
        `/api/shipments/${enquiryId}`,
        {
          bidId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(bidApprovalResponse.data);

      dispatch(approveBid(bidApprovalResponse.data));
      dispatch(removeEnquiry(bidApprovalResponse.data.enquiryId._id));
      dispatch(removeEnquiryFromMarket(bidApprovalResponse.data.enquiryId._id));
      navigate(`/shipments`);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startGetAllMyShipments = () => {
  return async (dispatch) => {
    try {
      const shipmentResponse = await axios.get("/api/shipments", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch(getAllMyShipments(shipmentResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

const approveBid = (data) => {
  return {
    type: "APPROVE_BID",
    payload: data,
  };
};

const getAllMyShipments = (data) => {
  return { type: "GET_SHIPMENTS", payload: data };
};
