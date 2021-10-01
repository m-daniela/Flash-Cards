
export const routes = {
    lessons: "/",
    categories: "/:lesson",
    card: "/:lesson/:category",
    review: "/:lesson/:category/review",
};


export const port = 5000;

export const main = `http://localhost:${port}/`;

export const getLessonsUrl = `${main}lessons`;
export const addLessonUrl = `${main}lesson`;
export const deleteLessonUrl = (lesson: string): string => `${main}${lesson}`;
export const updateLessonUrl = (lesson: string): string => `${main}${lesson}`;


export const getCategoriesUrl = (lesson: string): string => `${main}${lesson}`;
export const addCategoryUrl = (lesson: string): string => `${main}${lesson}/category`;
export const deleteCategoryUrl = (lesson: string, category: string): string => `${main}${lesson}/category/${category}`;
export const updateCategoryUrl = (lesson: string, category: string): string => `${main}${lesson}/category/${category}`;


export const getCardsUrl = (lesson: string, category: string): string => `${main}${lesson}/category/${category}`;
export const addCardUrl = (lesson: string, category: string): string => `${main}${lesson}/category/${category}/card`;
export const deleteCardUrl = (lesson: string, category: string, card: string): string => `${main}${lesson}/category/${category}/card/${card}`;
export const updateCardUrl = (lesson: string, category: string, card: string): string => `${main}${lesson}/category/${category}/card/${card}`;