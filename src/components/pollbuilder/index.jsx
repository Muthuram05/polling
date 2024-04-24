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

import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { createPoll } from "../../controllers/poll";

import { v4 as uuidv4 } from 'uuid';
import { userStore } from "../../store";

import "./styles.css";


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
  const { handleClose, rowData } = props;
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
  ];

  const addOption = function () {
    //setAnswers()
    setInputElement(true);
  };

  const [selectedType, setSelectedType] = useState("single");
  const [answers, setAnswers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showInput, setInputElement] = useState(false);
  const [title, setTitle] = useState("");
  const user = userStore((state) => state.user);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(answers, "answers")
    if(answers) {
      setAnswers([...answers, inputVal]);
    } else {
      setAnswers([inputVal])
    }

    setInputElement(false)
    setInputVal("")
  }
  function handleSave(){
    if(title) {
      const id = uuidv4()
      createPoll(id,{id, question: title, options: answers, author: user.uid}).then((data)=> console.log(data))
    }
   
  }


  console.log(answers, "answers")

  useEffect(() => {
      setAnswers(rowData?.options);
      setTitle(rowData?.question)
  }, [rowData])


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
              <FormLabel id="demo-row-radio-buttons-group-label" className="">
                Poll Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {pollType.map((type, index) => {
                  return (
                    <div className="polltype" key={index}>
                      <FormControlLabel
                        value={type.id}
                        control={<Radio />}
                        label={type.value}
                        checked={type.id === selectedType}
                        onChange={() => setSelectedType(type.id)}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <div className="question">
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            {selectedType === "single" ? (
              <div>
                <FormControl>
                  <RadioGroup>
                    {answers?.map((data, index) => {
                      return (
                        <div className="radioLabel" key={index}>
                          <FormControlLabel
                            control={<Radio />}
                            label={data}
                            value={data}
                          />
                        </div>
                      );
                    })}
                  </RadioGroup>
                  <Button variant="contained" onClick={addOption}>
                    Add option
                  </Button>
                </FormControl>
                {showInput && (
                  <form onSubmit={submitHandler}>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => {
                        setInputVal(e.target.value);
                      }}
                    />
                    <button>+</button>
                  </form>
                  
                )}
              </div>
            ) : (
              <div>
                <FormControl>
                  <FormGroup>
                    {answers?.map((data, index) => {
                      return (
                        <div className="checkBoxLabel" key={index}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={data}
                          />
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Button variant="contained" onClick={addOption}>
                    Add option
                  </Button>
                </FormControl>
                {showInput && (
                  <form onSubmit={submitHandler}>
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => {
                        setInputVal(e.target.value);
                      }}
                    />
                    <button>+</button>
                  </form>
                )}
              </div>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Typography className="closeModal" onClick={handleClose}>
            X
          </Typography>
          <Typography>
          <button onClick={handleSave}>Save</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
