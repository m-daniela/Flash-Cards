import axios from "axios";
import { addLessonUrl, getCategoriesUrl, getLessonsUrl } from "../constants";

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
