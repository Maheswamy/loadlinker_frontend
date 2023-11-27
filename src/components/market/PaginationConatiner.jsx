import React from "react";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

const PaginationConatiner = () => {
  const count = useSelector((state) => state.market.count);
  return (
    <>
      <Pagination count={count} color="primary" />
    </>
  );
};

export default PaginationConatiner;
