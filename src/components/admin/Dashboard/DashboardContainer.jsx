import React from "react";
import GraphContainer from "./GraphContainer";
import QueryContainer from "./QueryContainer";
import DetailContainer from "./DetailContainer";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { CircularProgress, Stack } from "@mui/material";

const DashboardContainer = () => {
  const { info } = useSelector((state) => state.analysis);
  console.log(info, "sfsd");
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      {isEmpty(info) ? (
        <CircularProgress />
      ) : (
        <>
          <QueryContainer />
          <DetailContainer />
          <GraphContainer data={info.users}/>
        </>
      )}
    </Stack>
  );
};

export default DashboardContainer;
