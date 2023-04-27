// importing mui used components
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// import react built in to implement.
import { useEffect, useState } from "react";

// import useNavigate built in react-router-dom from to implement route programmitcally.
import { useNavigate } from "react-router-dom";

//import axios to fetch data from server
import axios from "axios";

//import progrss from component
import ProgressComponent from "../components/progressComponent";

// import soundComponet to used here
import ContainerSound from "../components/containerSound";

// import interfaces to used.
import { questionInterface } from "../types/question";

//import toast from helper to display error or sucess or warning
import { toastWarning, toastError, toastSuccess } from "../errors/helper";

//import buttons from styled MUI
import { StyledButtonNext, StyledButtonCheck } from "../styled/Button";

import { memo } from "react";

const TriviaPage = () => {
  // setting  state
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<questionInterface[]>([]);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [percent, setPercent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [bgColor, setBgColor] = useState("green");
  const [checkAnswer, setIscheckAnswer] = useState(false);
  const [sound, setSound] = useState(false);

  const navigate = useNavigate();

  const numberOfQuestion: number =
    Number(localStorage.getItem("num")) !== null
      ? Number(localStorage.getItem("num"))
      : 1;
  // fetching Questions from the server
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=${numberOfQuestion}`)
      .then((response) => {
        setQuestions(response.data.results);
        console.log(response.data.results
          );

      })

      .catch((err) => {
        toastError(err);
      });
  }, [numberOfQuestion]);

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    setName(name);
  }, [counter]);
  const handleAnswer = (answer: string) => {
    setAnswer(answer);
    setBgColor(answer);
    console.log(answer);
  };

  const CheckAnswerHandler = () => {
    if (checkAnswer) {
      toastWarning("You can't answer 2 twice ");
    }

    if (answer === "" && counter !== numberOfQuestion) {
      toastWarning("You must choose  answer");
    }

    if (answer === questions[counter].correct_answer) {
      setScore((prevQuestion) => (prevQuestion += 1));
      toastSuccess("Answer right ");
      setIscheckAnswer(true);
    }

    if (answer !== questions[counter].correct_answer && answer !== "") {
      setIscheckAnswer(true);
      toastError("Answer wrong ");
    }
  };
  const handleNext = () => {
    

    if (answer === "" && counter !== numberOfQuestion) {
      toastWarning("You must choose  answer");
      return;
    }

    if (counter === numberOfQuestion) {
      setSound(true);
    }

    if (answer === questions[counter].correct_answer) {
      setScore((prevQuestion) => (prevQuestion += 1));

      setIscheckAnswer(true);
    }

    if (answer !== questions[counter].correct_answer && answer !== "") {
      setIscheckAnswer(true);
    }

    setCounter((counter) => (counter += 1));
    setIscheckAnswer(false);
    handlePercent();
    setBgColor("green");
    setAnswer("");
  };

  const handlePercent = () => {
    //Calutate Practice= number of checkAnswer questions / total number of questions)*100
    const lengthQuestions = questions.length;
    setPercent(Math.round(((counter + 1) / lengthQuestions) * 100));
    return percent;
  };

  const handleResult = () => {
    navigate("/result");
    // storing the result in localStorage to be used in result page.
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("statusProgress", "finish");
  };

  return (
    <>
      <Stack
        justifyContent="space-around"
        alignItems="center"
        gap={8}
        height="50%"
      >
        <ProgressComponent precent={percent} />

        {name && (
          <Typography
            component="span"
            sx={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {" "}
            Welcome.. {name}.
          </Typography>
        )}

        <Box
          sx={{
            backgroundColor: "#F2F4F5",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ color: "#FF7332" }}>
            {questions[counter]?.category}
          </Typography>
          <ContainerSound sound={sound}>
            {questions[counter] ? questions[counter].question : "Done !"}
          </ContainerSound>
        </Box>

        {counter < numberOfQuestion && (
          <Grid container gap={1} justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              sx={{
                backgroundColor: `${
                  bgColor === questions[counter]?.correct_answer
                    ? "#5E9283"
                    : "#FF7332"
                }`,

                "&:hover": {
                  backgroundColor: "#185f55",
                },
              }}
              onClick={() => {
                handleAnswer(questions[counter]?.correct_answer);
              }}
            >
              {questions[counter]?.correct_answer}
            </Button>

            {/* showing  answers buttons */}

            {
              questions[counter]?.incorrect_answers.map((x: any) => {
                return (
                  <Button
                    key={x}
                    variant="contained"
                    sx={{
                      backgroundColor: `${bgColor === x ? "#5E9283" : "#FF7332"}`,

                      "&:hover": {
                        backgroundColor: "#185f55",
                      },
                    }}
                    onClick={() => {
                      handleAnswer(x);
                    }}
                  >
                    {x}
                  </Button>
                );
              })
            }
            
          </Grid>
        )}

        <Box component="div" sx={{ fontSize: "1.4rem" }}>
          Your Score is{" "}
          <Box component="span" sx={{ fontWeight: "bold", color: "#185f55" }}>
            {score}{" "}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
          }}
        >
          {counter < numberOfQuestion && (
            <>
              <StyledButtonCheck onClick={CheckAnswerHandler}>
                Check Answer
              </StyledButtonCheck>

              <StyledButtonNext onClick={handleNext}>
                Next Question
              </StyledButtonNext>
            </>
          )}
          {counter >= numberOfQuestion && (
            <StyledButtonCheck onClick={handleResult}>
              Show Rank
            </StyledButtonCheck>
          )}
        </Box>
      </Stack>{" "}
    </>
  );
};

export default memo(TriviaPage);
