import { CategoryType } from "../types/CategoryType";
import { API_URL } from "./config";
import axios from "axios";

export const getCategories = async () => {
    const response = await axios.get(`${API_URL.GET_CATEGORIES}`);
    const data = response.data.trivia_categories as CategoryType[];
    
    data.sort(function (a: CategoryType, b: CategoryType) {
    return a.name.localeCompare(b.name);
    });

    return data;
}