import {
  Card,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TriviaType } from "../types/TriviaType";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { decode } from "html-entities";
import { addResult } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectSetup } from "../redux/store";
import { Countdown } from "./timer";

interface props {
  trivia: TriviaType;
}

interface Answer {
  text: string;
  valid: boolean;
}

export const Trivia = ({ trivia }: props) => {
  const dispatch = useDispatch();
  const setup = useSelector(selectSetup);

  let answers: Answer[] = [];
  trivia.incorrectAnswers.map((answer: string) => {
    return answers.push({ text: answer, valid: false });
  });
  answers.push({ text: trivia.correctAnswer, valid: true });
  answers.sort((a: Answer, b: Answer) => {
    return a.text.localeCompare(b.text);
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<string>("");

  useEffect(() => {
    setShowAnswer(false);
    setChosenAnswer("");
    setFinished(false);
  }, [trivia]);

  const revealAnswer = (answer: string, valid: boolean) => {
    setShowAnswer(true);
    setChosenAnswer(answer);
    if (valid) dispatch(addResult());
  };

  const [finished, setFinished] = useState(false);

  const stopTimer = () => {
    console.log("stop");
    setFinished(true);
    setShowAnswer(true);
  };

  return (
    <Card sx={{ margin: 5 }}>
      <DialogTitle>{trivia.category}</DialogTitle>
      <DialogContent>
        <DialogContentText>{decode(trivia.question)}</DialogContentText>
        <List
          sx={{
            width: "100%",
            margin: "auto",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {answers.map((answer) => {
            return (
              <ListItemButton
                key={answer.text}
                onClick={() => revealAnswer(answer.text, answer.valid)}
                disabled={showAnswer}
              >
                <ListItemIcon>
                  {chosenAnswer !== answer.text &&
                    showAnswer &&
                    answer.valid && <ArrowForwardIcon color="info" />}
                  {chosenAnswer === answer.text &&
                    showAnswer &&
                    answer.valid && <CheckIcon color="success" />}
                  {chosenAnswer === answer.text &&
                    showAnswer &&
                    !answer.valid && <ClearIcon color="error" />}
                </ListItemIcon>
                <ListItemText primary={decode(answer.text)} />
              </ListItemButton>
            );
          })}
        </List>

        {/* <Countdown
          trivia={trivia.question}
          finished={finished}
          stopTimer={() => stopTimer}
        /> */}
      </DialogContent>
    </Card>
  );
};
