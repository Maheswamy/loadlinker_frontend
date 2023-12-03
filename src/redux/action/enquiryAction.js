import axios from "../../config/axios";
import { removeEnquiryFromMarket } from "./marketAction";

export const startGetEnquiryCalculation = (formData, SpinnerHandler) => {
  return async (dispatch) => {
    try {
      const calculationRespose = await axios.post(
        "/api/enquiries/calculate",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      SpinnerHandler(false);
      dispatch(getCalculate(calculationRespose.data));
    } catch (e) {
      SpinnerHandler(false);

      if (e.status === 400) {
        console.log(e.response.data.errors);
        dispatch(serverErrors(e.response.data.errors));
      }
      if (e.status === 500) {
        alert(e.message);
      }
    }
  };
};

export const startAddEnquiry = (formData, handleNavigate, SpinnerHandler,) => {
  return async (dispatch) => {
    try {
      const addEnquiryResponse = await axios.post(
        "/api/enquiries/create",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(addEnquiryResponse, "response of add enquiry");
      handleNavigate();
      dispatch(addEnquiry(addEnquiryResponse.data));
    } catch (e) {
      SpinnerHandler(false);

      console.log(e);
      if (e.request.status === 400) {
        console.log(e.response.data.errors);
        dispatch(serverErrors(e.response.data.errors));
        handleNavigate(true);
      }
      if (e.request.status === 500) {
        handleNavigate(true);
        alert(e.message);
      }
    }
  };
};

export const startGetMyEnquiries = () => {
  return async (dispatch) => {
    try {
      const allEnquiriesResponse = await axios.get("/api/enquiries", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(allEnquiriesResponse.data);
      dispatch(getAllEnquiries(allEnquiriesResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startRemoveShipperEnquiry = (enquiryId) => {
  return async (dispatch) => {
    try {
      const deleteShipperEnquiry = await axios.delete(
        `/api/enquiries/${enquiryId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(deleteShipperEnquiry.data);
      dispatch(removeEnquiry(deleteShipperEnquiry.data._id));
      dispatch(removeEnquiryFromMarket(deleteShipperEnquiry.data._id));
    } catch (e) {
      console.log(e);
      // alert(e.response.data.errors);
    }
  };
};

const getCalculate = (data) => {
  return {
    type: "ADD_CALCULATION",
    payload: data,
  };
};

const addEnquiry = (data) => {
  return {
    type: "ADD_ENQUIRY",
    payload: data,
  };
};
export const deleteCalculate = () => {
  return {
    type: "REMOVE_CALCULATION",
  };
};

export const newCalculationCoordinates = (data) => {
  return {
    type: "NEW_CALCULATION_COORDINATES",
    payload: data,
  };
};

const getAllEnquiries = (data) => {
  return {
    type: "GET_MY_ENQUIRIES",
    payload: data,
  };
};

export const removeEnquiry = (data) => {
  return {
    type: "REMOVE_ENQUIRY",
    payload: data,
  };
};

export const clearEnquiryOnLogOut = () => {
  return {
    type: "LOG_CLEAR",
  };
};

const serverErrors = (data) => {
  return {
    type: "SERVER_ERRORS",
    payload: data,
  };
};
