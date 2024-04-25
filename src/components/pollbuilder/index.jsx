import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { createPoll, updatePoll } from "../../controllers/poll";
import { v4 as uuidv4 } from "uuid";
import { userStore } from "../../store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export const PollBuilderModal = (props) => {
  const { handleClose, rowData, isEdit = false } = props;

  const pollType = [
    {
      id: "single",
      value: "Single answer",
    },
    {
      id: "multiple",
      value: "Multiple answers",
    },
  ];

  const [selectedType, setSelectedType] = useState("single");
  const [answers, setAnswers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showInput, setInputElement] = useState(false);
  const [title, setTitle] = useState("");
  const user = userStore((state) => state.user);

  useEffect(() => {
    if (rowData) {
      setAnswers(rowData?.options);
      setTitle(rowData?.title);
    }
  }, [rowData]);

  const handleSave = () => {
    if (title) {
      const id = isEdit ? rowData.id : uuidv4();
      const pollData = {
        id,
        title,
        options: answers,
        author: user.uid,
        type: selectedType,
      };

      if (isEdit) {
        updatePoll(pollData)
          .then((data) => console.log(data, "create"))
          .catch((error) => console.error("Error updating poll:", error));
      } else {
        createPoll(id, pollData)
          .then((data) => console.log(data))
          .catch((error) => console.error("Error creating poll:", error));
      }

      handleClose();
    }
  };

  const handleAddOption = () => {
    setInputElement(true);
  };

  const handleSaveOption = () => {
    if (inputVal.trim() !== "") {
      setAnswers([...answers, inputVal]);
      setInputVal("");
      setInputElement(false);
    }
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Poll Builder</span>
              <Button onClick={handleClose}>X</Button>
            </div>
            <FormControl>
              <FormLabel>Poll Type</FormLabel>
              <RadioGroup
                row
                name="poll-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {pollType.map((type) => (
                  <FormControlLabel
                    key={type.id}
                    value={type.id}
                    control={<Radio />}
                    label={type.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="question">
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <FormControl>
              <FormGroup>
                {answers?.map((answer, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      selectedType === "single" ? <Radio /> : <Checkbox />
                    }
                    label={answer}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Typography>
          {showInput && (
            <div style={{ marginTop: "10px", display: "flex" }}>
              <TextField
                label="Option"
                variant="outlined"
                fullWidth
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <Button
                onClick={handleSaveOption}
                variant="text"
                style={{ marginLeft: "10px" }}
              >
                Save Option
              </Button>
            </div>
          )}
          <Box
            sx={{
              position: "sticky",
              bottom: "20px",
              textAlign: "center",
            }}
          >
            <Button onClick={handleAddOption} variant="outlined">
              Add Option
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
