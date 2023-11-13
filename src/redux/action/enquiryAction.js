import axios from "axios";

export const startGetEnquiryCalculation = (formData) => {
  return async (dispatch) => {
    try {
      const calculationRespose = await axios.post(
        "http://localhost:3080/api/enquiries/calculate",
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
        "http://localhost:3080/api/enquiries/create",
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
