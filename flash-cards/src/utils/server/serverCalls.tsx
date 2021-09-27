import axios from "axios";
import { addCategoryUrl, addLessonUrl, getCardsUrl, getCategoriesUrl, getLessonsUrl } from "../constants";
import { Category, Lesson } from "../types";

// lessons

/**
 * get lessons
 * @returns promise with the lessons
 */
export const getLessons = async (): Promise<any> => {
    return axios.get(getLessonsUrl)
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};


export const addLesson = async (lesson: string): Promise<any> => {
    return axios.post(addLessonUrl, {lesson})
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};


// categories

export const getCategories = async (lesson: string): Promise<any> => {
    return axios.get(getCategoriesUrl(lesson))
        .then((result) => {
            console.log(result.data);
            return result.data;
        })
        .catch(console.log);
};

export const addCategory = async (lesson: string, category: string): Promise<any> => {
    return axios.post(addCategoryUrl(lesson), {category})
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};



// cards

export const getCards = async (lesson: string, category: string): Promise<any> => {
    return axios.get(getCardsUrl(lesson, category))
        .then((result) => {
            console.log(result.data);
            return result.data;
        })
        .catch(console.log);
};