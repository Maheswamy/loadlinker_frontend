import axios from "../../config/axios";

export const startGetEnquiryCalculation = (formData) => {
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

      dispatch(getCalculate(calculationRespose.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
};

export const startAddEnquiry = (formData) => {
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

      console.log(addEnquiryResponse);
      dispatch(addEnquiry(addEnquiryResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
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
