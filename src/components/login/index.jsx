import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom"; 
import { signIn } from "../../controllers/auth";
import { userStore } from "../../store";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();
  const handleSubmit = () => {
    signIn(email, password).then((data) => setUser(data));
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2, width: "100%" },
          "& .MuiButton-root": { mt: 2 },
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
      <Typography variant="body2" mt={2}>
        <Link to="/sign-up" color="primary">
          Create Account
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
