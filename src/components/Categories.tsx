import { useEffect, useState } from "react";
import { Box, Chip, CircularProgress } from "@mui/material";
import { CategoryType } from "../types/CategoryType";
import { getCategories } from "../apis/getCategories";
import { useDispatch, useSelector } from "react-redux";
import { selectSetup, addCategory } from "../redux/store";

export const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);
  const dispatch = useDispatch();
  const setup = useSelector(selectSetup);

  const fetchCategories = async () => {
    const data = await getCategories();
    setData(data);
  };

  useEffect(() => {
    data && setLoading(false);
  }, [data]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClick = (categoryName: string) => {
    dispatch(addCategory(categoryName));
  };

  if (!data) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            margin: "0 auto 10px auto",
            "& div": {
              m: "5px",
            },
          }}
        >
          {data?.map((category: string, index: number) => {
            return (
              <Chip
                key={index}
                color={
                  setup.questionCategories.includes(category)
                    ? "success"
                    : "primary"
                }
                onClick={() => handleClick(category)}
                label={category}
              />
            );
          })}
        </Box>
      </>
    );
  }
};
