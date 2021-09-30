import axios from "axios";
import { addCardUrl, addCategoryUrl, addLessonUrl, deleteCardUrl, deleteCategoryUrl, deleteLessonUrl, getCardsUrl, getCategoriesUrl, getLessonsUrl, updateCardUrl, updateCategoryUrl, updateLessonUrl } from "../constants";
import { SimpleCard } from "../types";

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

export const deleteLesson = async (lesson: string): Promise<any> => {
    return axios.delete(deleteLessonUrl(lesson))
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};

export const updateLesson = async (lesson: string, newLesson: string): Promise<any> => {
    return axios.post(updateLessonUrl(lesson), {lesson: newLesson})
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

export const deleteCategory = async (lesson: string, category: string): Promise<any> => {
    return axios.delete(deleteCategoryUrl(lesson, category))
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};

export const updateCategory = async (lesson: string, category: string, newCategory: string): Promise<any> => {
    return axios.post(updateCategoryUrl(lesson, category), {category: newCategory})
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

export const addCard = async (lesson: string, category: string, card: SimpleCard): Promise<any> => {
    return axios.post(addCardUrl(lesson, category), {...card})
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};


export const deleteCard = async (lesson: string, category: string, card: string): Promise<any> => {
    return axios.delete(deleteCardUrl(lesson, category, card))
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};

export const updateCard = async (lesson: string, category: string, card: string, newCard: SimpleCard): Promise<any> => {
    return axios.post(updateCardUrl(lesson, category, card), {...newCard})
        .then((result) => {
            return result.data;
        })
        .catch(console.log);
};