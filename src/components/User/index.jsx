import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { getSpecificPoll, userResponse } from "../../controllers/poll";
import { Button } from "@mui/material";

// const data = {
//   options: ["A", "B", "C"],
//   question: "what is fav colur?",
//   _id: "data_1",
//   type: "single",
// };

export function UserForm() {
  let { id } = useParams();
  const [pollDeatils, setpollDeatils] = useState({});

  useEffect(() => {
    getSpecificPoll(id).then((res) => {
      setpollDeatils(res);
    });
  });
  function handleSubmit(){
    userResponse(id, pollDeatils).then(data => console.log(data))
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <div>Hi user !</div>
          <div>{pollDeatils.title}</div>

          {pollDeatils.type === "single" ? (
            <div>
              <FormControl>
                <RadioGroup>
                  {pollDeatils.options?.map((data, index) => {
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
              </FormControl>
            </div>
          ) : (
            <div>
              <FormControl>
                <FormGroup>
                  {pollDeatils.options?.map((data, index) => {
                    return (
                      <div className="checkBoxLabel" key={index}>
                        <FormControlLabel control={<Checkbox />} label={data} />
                      </div>
                    );
                  })}
                </FormGroup>
              </FormControl>
            </div>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
}
