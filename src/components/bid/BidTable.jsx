import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function BidTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location = useLocation();
  useEffect(() => {
    console.log(location.state?.message);
    if (location.state?.message) {
      toast.success(location.state?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const bids = useSelector((state) => state.bid.mybids) || [];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, bids.length - page * rowsPerPage);

  const navigate = useNavigate();
  const handleMyBidShowMore = (id) => {
    navigate(`/mybids/${id}`);
  };
  return (
    <>
      <ToastContainer />
      {bids.length == 0 ? (
        <Typography variant="h5" color="primary">
          No bids found
        </Typography>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "90vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Number</TableCell>
                  <TableCell>Enquiry Amount</TableCell>
                  <TableCell>Bid Amount</TableCell>
                  <TableCell>Load Type</TableCell>
                  <TableCell>Load Weight</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? bids.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : bids
                ).map((ele) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ele._id}>
                    <TableCell>{ele?.vehicleId?.vehicleNumber}</TableCell>
                    <TableCell>{ele?.enquiryId?.amount}</TableCell>
                    <TableCell>{ele?.bidAmount}</TableCell>
                    <TableCell>{ele?.enquiryId?.loadType}</TableCell>
                    <TableCell>{ele?.enquiryId?.loadWeight}</TableCell>
                    <TableCell>{ele?.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        disableRipple
                        onClick={() => handleMyBidShowMore(ele._id)}
                      >
                        Show more
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={bids.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
