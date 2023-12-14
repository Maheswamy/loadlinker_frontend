import axios from "../../config/axios";

export const startGetInfo = () => {
  return async (dispatch) => {
    try {
      const infoResponse = await axios.get("/api/admin", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(infoResponse.data);
      dispatch(getInfo(infoResponse.data));
    } catch (e) {
      console.log(e)
    }
  };
};

const getInfo = (data) => {
  return {
    type: "GET_INFO",
    payload: data,
  };
};
