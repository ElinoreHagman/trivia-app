import {
  Box,
  Button,
  CircularProgress,
  Container,
  DialogTitle,
  useTheme,
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import React, { useEffect } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Trivia } from "./Trivia";
import { useSelector } from "react-redux";
import { selectSetup } from "../redux/store";

interface props {
  endTrivia: () => void;
}

export const TriviaArea = ({ endTrivia }: props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [endGame, setEndGame] = React.useState(false);
  const setup = useSelector(selectSetup);
  const maxSteps: any = setup.questionAmount;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (activeStep === maxSteps - 1) setEndGame(true);
  }, [activeStep]);

  if (!setup.triviaQuestions) return <CircularProgress />;
  else {
    if (setup.triviaQuestions.length === 0)
      return (
        <>
          <DialogTitle>No questions found</DialogTitle>
          <Button size="large" variant="contained" onClick={endTrivia}>
            Change settings
          </Button>
        </>
      );
    else {
      return (
        <Container sx={{ height: "100vh", p: 0 }}>
          <DialogTitle>{`Question ${activeStep + 1}`}</DialogTitle>
          <Box sx={{ height: "auto", width: "100%", paddingBottom: "50px" }}>
            {setup.triviaQuestions && (
              <Trivia trivia={setup.triviaQuestions[activeStep]} />
            )}
            {endGame && (
              <Button size="large" variant="contained" onClick={endTrivia}>
                End Game
              </Button>
            )}
          </Box>
          <MobileStepper
            variant="text"
            steps={parseInt(maxSteps)}
            position="bottom"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={<Button size="small" disabled={true}></Button>}
          />
        </Container>
      );
    }
  }
};
