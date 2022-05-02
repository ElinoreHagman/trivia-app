import { API_URL, BASE_URL,  } from "./config";
import axios from "axios";
import { TriviaType } from "../types/TriviaType";
import { Setup } from "../redux/store";

export const GetTriviaQuestions = async (setup : Setup) => {
    let url : string = `${API_URL.GET_QUESTIONS}?limit=${setup.questionAmount}`;
    if(setup.questionCategories.length > 0) {
        url += `&categories=`;
        setup.questionCategories.map((category) => {
            let c = category.replace(' & ', '_and_');
            url += `${c}`
            if(setup.questionCategories.indexOf(category) < setup.questionCategories.length -1) {
                url += `,`;
            }
        })
    };
    if(setup.questionDifficulty) url += `&difficulty=${setup.questionDifficulty}`;
    const response = await axios.get(url);

    const data = response.data as TriviaType[];
    return data;
}