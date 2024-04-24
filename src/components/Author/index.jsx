import React, { useEffect, useState } from "react";
import { userStore } from "../../store";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { IconButton, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { getPoll } from "../../controllers/poll";

import "./style.css";
import { PollBuilderModal } from "../pollbuilder";

//list header
//body
//

const POLL_LIST = [
  {
    question: "what is yor fav color ?",
    options: ["A", "B", "C", "D"],
    _id: "poll001",
  },
  {
    question: "what is yor fav color ?",
    options: ["A", "B", "C", "D"],
    _id: "poll002",
  },
  {
    question: "what is yor fav color ?",
    options: ["A", "B", "C", "D"],
    _id: "poll003",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "12px",
};

export function PollWrapper() {
  const [modelState, setModelState] = useState("");
  const [pollList, setPolllist] = useState([]);
  const user = userStore((state) => state.user);

  useEffect(() => {
    if (user) {
      getPoll(user.uid).then((res) => {
        setPolllist(res ? res : []);
      });
    }
  }, [user]);


  const [rowData, setRowData] = useState();
  const handleClose = () => {
    setModelState(false); 
  }

  console.log(pollList, "pollList")

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <PollListHeader />
          <PollList setModelState={setModelState} pollList={pollList} setRowData={setRowData} />
        </Box>
      </Container>
      {modelState === "delete" && (
        <ActionModel
          setModelState={setModelState}
          content={"Are you sure want to delete ?"}
        />
      )}
      {modelState === "share" && <CopyToClipboardButton />}
      {modelState === "edit" && <PollBuilderModal handleClose={handleClose} question={""} rowData={rowData} />}
      {modelState === "create" && <ActionModel setModelState={setModelState} />}
    </>
  );
}

const CopyToClipboardButton = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <ShareIcon />
      </IconButton>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export function ActionModel({ setModelState, content }) {
  return (
    <Modal
      open={true}
      onClose={() => {
        setModelState("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modelContainer">
          <div
            className="closeButton"
            onClick={() => {
              setModelState("");
            }}
          >
            X
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {content}
          </Typography>
        </div>
      </Box>
    </Modal>
  );
}

export function PollListHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div>
    <Box component="section" sx={{ p: 2, border: "1px  grey" }}>
      <div className="container">
        <div> Hi ! Polling </div>
        <Button variant="contained" onClick={()=> setOpen(true)}>Create</Button>
      </div>
    </Box>
    {open ? <PollBuilderModal handleClose={() =>setOpen(false)} />: null}
    </div>
  );
}

export function PollList({ setModelState, setRowData, pollList = [] }) {
  return (
    <Box component="section" sx={{ p: 2, border: "1px  grey" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">Question</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {pollList.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  <div>
                    <IconButton
                      onClick={() => {
                        setModelState("edit");
                        setRowData(row);
                        
                      }}
                      color="primary"
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setModelState("delete");
                      }}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setModelState("respose");
                      }}
                    >
                      respose
                    </Button>

                    <CopyToClipboardButton />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
