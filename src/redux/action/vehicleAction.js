import axios from "../../config/axios";

export const startVehicleType = () => {
  return async (dispatch) => {
    try {
      const vehicleTypeResponse = await axios.get("/api/vehicleTypes", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getVehicleType(vehicleTypeResponse.data));
    } catch (e) {
      alert(e.message);
    }
  };
};
export const startPermitList = () => {
  return async (dispatch) => {
    try {
      const permitListResponse = await axios.get("/api/permits", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getPermitList(permitListResponse.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startAddVehicle = (body, navigate, serverErrorsHandler) => {
  return async (dispatch) => {
    try {
      const addVehicleResponse = await axios.post("/api/vehicles", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate(`/myvehicle/${addVehicleResponse.data._id}`);
      dispatch(addVehicle(addVehicleResponse.data));
    } catch (e) {
      if (e.response.status === 400) {
        serverErrorsHandler(e.response.data.errors);
        console.log(e)
      } else {
        console.log(e);
      }
    }
  };
};

export const startGetVehicle = () => {
  return async (dispatch) => {
    try {
      const getVehicles = await axios.get("/api/vehicles", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getVehicle(getVehicles.data));
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };
};

export const startUpdateVehicle = ({
  vehicleId,
  formData,
  showToastMessage,
}) => {
  return async (dispatch) => {
    try {
      const updatedResponse = await axios.put(
        `/api/vehicles/${vehicleId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(updatedResponse.data);
      showToastMessage(
        updatedResponse.data.isVerified === "approved"
          ? "Vehicle is approved"
          : "vehicle is rejected"
      );
      dispatch(updatedVehicle(updatedResponse.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startRemoveVehicle = ({ id, navigate, handleSpinner }) => {
  return async (dispatch) => {
    try {
      const removeVehicleResponse = await axios.delete(`/api/vehicles/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(removeVehicleResponse.data);
      dispatch(removeVehicle(removeVehicleResponse.data));
      navigate("/myvehicle");
    } catch (e) {
      handleSpinner(false);
      console.log(e);
    }
  };
};

const getVehicleType = (data) => {
  return { type: "GET_VEHICLE_TYPE_LIST", payload: data };
};

const getPermitList = (data) => {
  return { type: "GET_PERMIT_LIST", payload: data };
};

const addVehicle = (data) => {
  return {
    type: "ADD_VEHICLE",
    payload: data,
  };
};

const getVehicle = (data) => {
  return {
    type: "GET_VEHICLE",
    payload: data,
  };
};

export const clearVehicleOnLogOut = () => {
  return {
    type: "LOG_CLEAR",
  };
};

const updatedVehicle = (data) => {
  return {
    type: "UPDATE_VEHICLE",
    payload: data,
  };
};

const removeVehicle = (data) => {
  return {
    type: "REMOVE_VEHICLE",
    payload: data,
  };
};
