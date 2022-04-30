import { Box, Button, Container, DialogTitle, useTheme } from "@mui/material";
import { Categories } from "./Categories";
import MobileStepper from "@mui/material/MobileStepper";
import React from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Settings } from "./Settings";
import { ReadyTrivia } from "./ReadyTrivia";

interface props {
  startTrivia: () => void;
}

export const Start = ({ startTrivia }: props) => {
  const steps = [
    {
      label: "Select category",
      component: <Categories />,
    },
    {
      label: "Further settings",
      component: <Settings />,
    },
    {
      label: "Start trivia",
      component: <ReadyTrivia startTrivia={startTrivia} />,
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container sx={{ height: "100vh", p: 0 }}>
      <DialogTitle>{steps[activeStep].label}</DialogTitle>
      <Box sx={{ height: "auto", width: "100%", paddingBottom: "50px" }}>
        {steps[activeStep].component}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
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
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Container>
  );
};
