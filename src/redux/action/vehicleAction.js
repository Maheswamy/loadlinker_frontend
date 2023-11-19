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

export const startAddVehicle = (body) => {
  return async (dispatch) => {
    try {
      const addVehicleResponse = await axios.post("/api/vehicles", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addVehicle(addVehicleResponse.data));
    } catch (e) {
      console.log(e);
      alert(e.message);
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
      dispatch(getVehicle(getVehicles.data))
    } catch (e) {
      console.log(e);
      alert(e);
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
