import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

interface props {
  stopTimer: () => void;
  finished: boolean;
  trivia: string;
}

export const Countdown = ({ stopTimer, finished, trivia }: props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        console.log(finished);
        if (oldProgress === 100 || finished) {
          stopTimer();
          console.log(finished);
          clearInterval(timer);
        }
        const diff = 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [trivia]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
