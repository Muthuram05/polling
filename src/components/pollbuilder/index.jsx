import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { createPoll } from "../../controllers/poll";

import { v4 as uuidv4 } from 'uuid';
import { userStore } from "../../store";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const PollBuilder = (props) => {
  const { question = "what is your favourite snacks", handleClose } = props;
  // const handleClose = () => {};
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const pollType = [
    {
      id: "single",
      value: "Single answer",
    },
    {
      id: "multiple",
      value: "Multiple answer",
    },
  ]

  const addOption = function() {
    //setAnswers()
    setInputElement(true)
  }

  const [selectedType, setSelectedType] = useState("single");
  const [answers, setAnswers] = useState(["biscuit", "burger", "snacks"]);
  const [inputVal, setInputVal] = useState("");
  const [showInput, setInputElement] = useState(false);
  const user = userStore((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();
    setAnswers([...answers, inputVal]);
    setInputElement(false)
    setInputVal("")
  }
  function handleSave(){
    const id = uuidv4()
    createPoll("123",{id, question,answers, author: user.uid}).then((data)=> console.log(data))
  }
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Poll Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {pollType.map((type) => {
                  return (
                    <FormControlLabel
                      value={type.id}
                      control={<Radio />}
                      label={type.value}
                      checked={type.id === selectedType}
                      onChange={() => setSelectedType(type.id)}
                    />
                  );
                })}
                {/* <FormControlLabel
                  value="Single answer"
                  control={<Radio />}
                  label="Single answer"
                />
                <FormControlLabel
                  value="Multiple Answer"
                  control={<Radio />}
                  label="Multiple answer"
                /> */}
              </RadioGroup>
            </FormControl>

            {selectedType === "single" ? (
              <div>
                <div>
                  <span>{question}</span>
                </div>
                <FormGroup>
                  {answers.map((data) => {
                    return (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={data}
                      />
                    );
                  })}
                </FormGroup>
                <Button variant="contained" onClick={addOption}>Add option</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
               {showInput && <form onSubmit={submitHandler}>
                  <input type="text" value={inputVal} onChange={(e) => {
                     setInputVal(e.target.value);
                  }} />
                </form>}
              </div>
            ) : (
              <div></div>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
};
