import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTriviaQuestions, selectSetup } from "../redux/store";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CategoryIcon from "@mui/icons-material/Category";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HardwareIcon from "@mui/icons-material/Hardware";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { GetTriviaQuestions } from "../apis/getTriviaFromCategory";

interface props {
  startTrivia: () => void;
}

export const ReadyTrivia = ({ startTrivia }: props) => {
  const dispatch = useDispatch();
  const setup = useSelector(selectSetup);

  const setTriviaQuestions = async () => {
    const data = await GetTriviaQuestions(setup);
    dispatch(addTriviaQuestions(data));
    startTrivia();
  };

  let categoriesListed: string = "";
  setup.questionCategories.map((category) => {
    categoriesListed += `${category}`;
    if (
      setup.questionCategories.indexOf(category) <
      setup.questionCategories.length - 1
    ) {
      categoriesListed += `, `;
    }
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", padding: "30px" }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <FormatListBulletedIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary={`Amount: ${
                setup.questionAmount <= 50
                  ? setup.questionAmount
                  : `50 (max amount)`
              }`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CategoryIcon color="info" />
            </ListItemIcon>
            <ListItemText primary={`Categories: ${categoriesListed}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <QuestionAnswerIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary={`Type: ${setup.questionType || "no preference"}`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HardwareIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary={`Difficulty: ${
                setup.questionDifficulty || "no preference"
              }`}
            />
          </ListItem>
        </List>
      </Grid>
      <Box
        sx={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          margin: "0 0 10px 0",
          "& div": {
            m: "5px",
          },
        }}
      >
        <Button
          size="large"
          variant="contained"
          endIcon={<PlayCircleFilledIcon />}
          onClick={setTriviaQuestions}
        >
          Start
        </Button>
      </Box>
    </>
  );
};
