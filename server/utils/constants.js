

const endpoints = {
    lessons: "/lessons",
    addLesson: "/lesson",
    deleteLesson: "/:lesson", 
    updateLesson: "/:lesson",

    categories: "/:lesson", 
    addCategory: "/:lesson/category", 
    deleteCategory: "/:lesson/category/:category", 
    updateCategory: "/:lesson/category/:category", 

    cards: "/:lesson/category/:category", 
    addCard: "/:lesson/category/:category/card", 
    deleteCard: "/:lesson/category/:category/card/:card", 
    updateCard: "/:lesson/category/:category/card/:card", 
};

module.exports = {
    endpoints
};