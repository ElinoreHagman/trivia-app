import { Box, Button, Container, DialogTitle, useTheme } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import React from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Trivia } from "./Trivia";
import { useSelector } from "react-redux";
import { selectSetup } from "../redux/store";

export const TriviaArea = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const setup = useSelector(selectSetup);
  const maxSteps: any = setup.questionAmount;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!setup.triviaQuestions) return <>Loading</>;
  else {
    return (
      <Container sx={{ height: "100vh", p: 0 }}>
        <DialogTitle>{`Question ${activeStep + 1}`}</DialogTitle>
        <Box sx={{ height: "auto", width: "100%", paddingBottom: "50px" }}>
          {setup.triviaQuestions && (
            <Trivia trivia={setup.triviaQuestions[activeStep]} />
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
          backButton={
            <Button size="small" onClick={handleBack} disabled={true}></Button>
          }
        />
      </Container>
    );
  }
};
