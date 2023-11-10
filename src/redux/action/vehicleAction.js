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
      console.log(e);
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
      console.log(e);
    }
  };
};

export const startAddVehicle = (body) => {
  return async (dispatch) => {
    try {
      const addVehicleResponse = await axios.post("/api/vehicles", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDhiZDJkYmEwMjQ5ZDk1OWVjMDk5ZSIsImVtYWlsIjoic3dhbXlAZ21haWwuY29tIiwicm9sZSI6Im93bmVyIiwiaWF0IjoxNjk5NjE4NzgyLCJleHAiOjE3MDAyMjM1ODJ9.r-SAw0KbhRMMNd8Z8BTtgxQEG8o4v4s988nomKbE4dI",
        },
      });
      console.log(addVehicleResponse.data);
    } catch (e) {
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
