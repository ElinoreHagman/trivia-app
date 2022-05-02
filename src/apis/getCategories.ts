import { CategoryType } from "../types/CategoryType";
import { API_URL } from "./config";
import axios from "axios";

export const getCategories = async () => {
    const response = await axios.get(`${API_URL.GET_CATEGORIES}`);

    let categories : string[] = [];
    Object.keys(response.data).map(function(category : string){
    categories.push(category);
    });

    return categories;
}