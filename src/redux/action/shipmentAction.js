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

export const startPayment = (formdata) => {
  return async (dispatch) => {
    try {
      const paymentResponse = await axios.post("/api/payment", formdata, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(paymentResponse.data);
      localStorage.setItem("transactionId", paymentResponse.data.id);

      window.location = paymentResponse.data.url;
    } catch (e) {
      console.log(e);
    }
  };
};

export const startUpdatePayment = (formData) => {
  return async (dispatch) => {
    try {
      const paymentResponse = await axios.put("/api/payment", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(paymentToShipment(paymentResponse.data));
      console.log(paymentResponse.data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const startUpdateShipment = (formData,shipmentId) => {
  return async (dispatch) => {
    try {
      const shipmentUpdateResponse=await axios.put(`/api/shipments/${shipmentId}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(shipmentUpdateResponse.data)
    } catch (e) {
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

const paymentToShipment = (data) => {
  return {
    type: "PAYMENT_DETAIL",
    payload: data,
  };
};

export const clearShipmentOnLogOut = () => {
  return {
    type: "LOG_CLEAR",
  };
};

const updateShipment = (data) => {
  return {
    type: "UPDATE_SHIPMENT_STATUS",
    payload: data,
  };
};
