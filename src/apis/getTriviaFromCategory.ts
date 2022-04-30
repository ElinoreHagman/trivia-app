import { BASE_URL } from "./config";
import axios from "axios";
import { TriviaType } from "../types/TriviaType";
import { Setup } from "../redux/store";

export const GetTriviaQuestions = async (setup : Setup) => {
    let url : string = `${BASE_URL}/api.php?amount=${setup.questionAmount}`;
    if(setup.categoryName) url += `&category=${setup.questionCategory}`;
    if(setup.questionDifficulty) url += `&difficulty=${setup.questionDifficulty}`;
    if(setup.questionType) url += `&type=${setup.questionType}`;

    const response = await axios.get(url);
    const data = response.data.results as TriviaType[];
    return data;
}