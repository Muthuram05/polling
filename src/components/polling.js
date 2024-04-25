import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

const Polling = () => {
  const [title, settitle] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPoll();
    const interval = setInterval(fetchPoll, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchPoll = () => {
    setIsLoading(true);
    axios
      .get("https://your-polling-api.com/poll")
      .then((response) => {
        const { title, options } = response.data;
        settitle(title);
        setOptions(options);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching poll:", error);
        setIsLoading(false);
      });
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleVote = () => {
    if (selectedOption) {
      axios
        .post("https://your-polling-api.com/vote", { option: selectedOption })
        .then(() => {
          setSelectedOption("");
          fetchPoll();
        })
        .catch((error) => {
          console.error("Error voting:", error);
        });
    }
  };

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div>
            {options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
            <Button onClick={handleVote} disabled={!selectedOption}>
              Vote
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Polling;
