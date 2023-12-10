import React from "react";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { startGetMarketList } from "../../redux/action/marketAction";

const PaginationConatiner = () => {
  const count = useSelector((state) => state.market.count);
  const dispatch = useDispatch();
  

  return (
    <>
      {count != 0 && (
        <Pagination
          count={count}
          color="primary"
          onChange={(event, value) => {
            dispatch(startGetMarketList('','','',(value-1)*2));
          }}
        />
      )}
    </>
  );
};

export default PaginationConatiner;
