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
import { IconButton, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import { deletePoll, getPoll } from "../../controllers/poll";

import "./style.css";
import { PollBuilderModal } from "../pollbuilder";
import PollResponse from "../modals/response";
import { auth } from "../../services/firebase"; // Import auth from firebase

//list header
//body
//
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const POLL_LIST = [
  {
    title: "what is yor fav color ?",
    options: ["A", "B", "C", "D"],
    _id: "poll001",
  },
  {
    title: "what is yor fav color ?",
    options: ["A", "B", "C", "D"],
    _id: "poll002",
  },
  {
    title: "what is yor fav color ?",
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
  const { user, currentPoll } = userStore((state) => state);

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
  };

  console.log(pollList, "pollList");

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <PollListHeader />
          <PollList
            setModelState={setModelState}
            pollList={pollList}
            setRowData={setRowData}
          />
          {/* Add Logout button */}
          <Box
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </Box>
        </Box>
      </Container>
      {modelState === "delete" && (
        <ActionModel
          setModelState={setModelState}
          title={"Delete"}
          content={"Are you sure want to delete ?"}
        />
      )}
      {modelState === "response" && currentPoll && (
        <ActionModel
          setModelState={setModelState}
          title={"Response"}
          content={<PollResponse pollId={currentPoll} />}
        />
      )}
      {modelState === "share" && <CopyToClipboardButton />}
      {modelState === "edit" && (
        <PollBuilderModal
          handleClose={handleClose}
          title={""}
          isEdit={!!rowData.options.length}
          rowData={rowData}
        />
      )}
      {modelState === "create" && <ActionModel setModelState={setModelState} />}
    </>
  );
}

const CopyToClipboardButton = ({ pollId = "" }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    pollId &&
      navigator.clipboard.writeText(`${window.location.toString()}${pollId}`);
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

export function ActionModel({ setModelState, title, content, footer }) {
  return (
    <BootstrapDialog
      onClose={setModelState}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClose={setModelState}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{footer}</DialogActions>
    </BootstrapDialog>
  );
}

export function PollListHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Box component="section" sx={{ p: 2, border: "1px  grey" }}>
        <div className="container">
          <div> Hi ! Polling </div>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create
          </Button>
        </div>
      </Box>
      {open ? <PollBuilderModal handleClose={() => setOpen(false)} /> : null}
    </div>
  );
}

export function PollList({ setModelState, setRowData, pollList = [] }) {
  const { setCurrentPoll } = userStore((state) => state);
  return (
    <Box component="section" sx={{ p: 2, border: "1px  grey" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {pollList.length !== 0 ? pollList.map((row, index) => (
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
                        deletePoll(row.id).then((data) => console.log(data));
                      }}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setCurrentPoll(row.id);
                        setModelState("response");
                      }}
                    >
                      response
                    </Button>

                    <CopyToClipboardButton pollId={row.id} />
                  </div>
                </TableCell>
              </TableRow>
            )) : <div>You have no poll created</div>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
