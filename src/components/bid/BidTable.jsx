import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function BidTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const bids = useSelector((state) => state.bid.mybids) || [];

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, bids.length - page * rowsPerPage);

  return (
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
              ? bids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  <Button variant="outlined" disableRipple>
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
  );
}
