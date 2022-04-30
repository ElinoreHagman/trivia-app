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

interface props {
  trivia: TriviaType;
}

interface Answer {
  text: string;
  valid: boolean;
}

export const Trivia = ({ trivia }: props) => {
  let answers: Answer[] = [];
  trivia.incorrect_answers.map((answer: string) => {
    return answers.push({ text: answer, valid: false });
  });
  answers.push({ text: trivia.correct_answer, valid: true });
  answers.sort((a: Answer, b: Answer) => {
    return a.text.localeCompare(b.text);
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<string>("");

  useEffect(() => {
    setShowAnswer(false);
    setChosenAnswer("");
  }, [trivia]);

  const revealAnswer = (answer: string) => {
    setShowAnswer(true);
    setChosenAnswer(answer);
  };

  return (
    <Card sx={{ margin: 5 }}>
      <DialogTitle>{trivia.category}</DialogTitle>
      <DialogContent>
        <DialogContentText>{trivia.question}</DialogContentText>
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
                onClick={() => revealAnswer(answer.text)}
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
                <ListItemText primary={answer.text} />
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
    </Card>
  );
};
