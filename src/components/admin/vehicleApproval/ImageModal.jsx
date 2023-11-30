import { Button, Modal, Box, Stack, TableRow, TableCell } from "@mui/material";
import ImageComp from "./ImageComp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #FF4000",
  boxShadow: 24,
  p: 4,
};

export default function ImageModal({ open, setOpen, images }) {
 
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">RC images</h2>
          <Box sx={{ margin: "auto" }}>
            <ImageComp images={images} />
          </Box>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="contained" onClick={() => setOpen(false)}>
              close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
