import { useState } from "react";
import {
  Box,
  Container,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSetup, addType, addAmount, addDifficulty } from "../redux/store";
import { Difficulties, Types } from "../enums/ApiTypes";

export const Settings = () => {
  const dispatch = useDispatch();
  const setup = useSelector(selectSetup);

  const [selectedDifficulty, setSelectedDifficulty] = useState(
    setup.questionDifficulty?.toString() || ""
  );
  const [selectedType, setSelectedType] = useState(
    setup.questionType?.toString() || ""
  );

  const handleDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDifficulty(event.target.name);
    dispatch(
      addDifficulty(
        Difficulties[event.target.name as keyof typeof Difficulties]
      )
    );
  };
  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.name);
    dispatch(addType(Types[event.target.name as keyof typeof Types]));
  };
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addAmount(event.target.value as unknown as number));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        "& div": {
          marginBottom: 2,
        },
      }}
    >
      <Box>
        <DialogTitle sx={{ marginBottom: 2 }}>
          Choose number of questions (1-50)
        </DialogTitle>
        <TextField
          onChange={handleAmount}
          color="info"
          defaultValue={setup.questionAmount <= 50 ? setup.questionAmount : 50}
          id="standard-size-normal"
          variant="outlined"
          focused
          type="number"
        />
      </Box>
      <Box>
        <DialogTitle>Choose difficulty</DialogTitle>
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={selectedDifficulty === Difficulties.easy}
                  onChange={handleDifficulty}
                  name={Difficulties.easy}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label={Difficulties.easy}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={selectedDifficulty === Difficulties.medium}
                  onChange={handleDifficulty}
                  name={Difficulties.medium}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label={Difficulties.medium}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={selectedDifficulty === Difficulties.hard}
                  onChange={handleDifficulty}
                  name={Difficulties.hard}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label={Difficulties.hard}
            />
            <FormControlLabel
              control={
                <Radio
                  checked={selectedDifficulty === ""}
                  onChange={handleDifficulty}
                  name=""
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label="no preference"
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box>
        <DialogTitle>Choose question type</DialogTitle>
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel
              control={
                <Radio
                  checked={selectedType === Types.boolean}
                  onChange={handleType}
                  name={Types.boolean}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label="true/false"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={selectedType === Types.multiple}
                  onChange={handleType}
                  name={Types.multiple}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label="multiple choice"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={selectedType === ""}
                  onChange={handleType}
                  name=""
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 32,
                    },
                  }}
                />
              }
              label="no preference"
            />
          </RadioGroup>
        </Box>
      </Box>
    </Container>
  );
};
