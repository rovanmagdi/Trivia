//import some built in react methods to create the state
import { useEffect, useState } from "react";

// import useNavigate built in react-router-dom from to implement route programmitcally.
import { useNavigate } from "react-router-dom";

// import from MUI
import { Box, Stack, Typography } from "@mui/material";

//import toast from helper to display error
import { toastError } from "../errors/helper";

import { StyledButtonRetake } from "../styled/Button";

const Result = () => {

  const navigate = useNavigate();
  //take score from localstorage
  let score: number = Number(localStorage.getItem("score")) || 0;
  const numberOfQuestion:number =
  Number(localStorage.getItem("num")) !== null
    ? Number(localStorage.getItem("num"))
    : 1;
  useEffect(() => {

    //Check score= 0 , take user to first page(Home page)
    !score && navigate("/");

  }, [navigate]);

  const handleRetake = () => {
    navigate("/");
    localStorage.setItem("score", "0") 
    localStorage.setItem("num", "0")
    localStorage.setItem("userName", " ")
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color:"white"
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "420px",
            height: "300px",
            borderRadius: "10px",
            backgroundColor: "#FF7332",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            gap={2}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.8em",
              }}
            >
              Your Score is  {((score/numberOfQuestion)*100).toFixed(1)} %
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <StyledButtonRetake onClick={handleRetake}>
                Retake it
              </StyledButtonRetake>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Result;
