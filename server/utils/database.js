const Lesson = require("../model/lesson");

// lessons

// get all lessons
const getLessons = async () => {
    return await Lesson.find({}, "-categories");
}

/**
 * add lesson
 * @param {string} lesson 
 */
const addLesson = async (lesson) => {
    const newLesson = new Lesson({
        _id: lesson
    })
    // const newLesson = new Lesson({
    //     _id: "EEE", 
    //     categories: [
    //         {
    //             _id: "a", 
    //             cards: [
    //                 {
    //                     question: "aaa?", 
    //                     answer: "bbb"
    //                 },
    //                 {
    //                     question: "no?", 
    //                     answer: "no"
    //                 }
    //             ]
    //         }
    //     ]
    // })
    return newLesson.save()
        .then((res) => res)
        .catch((err) => {
            console.log("Database add lesson error", err);
            return {};
        });
}

const deleteLesson = async (lesson) => {

}

const updateLesson = async (lesson, newLesson) => {

}

/**
 * get the categories from a specified lesson
 * @param {string} lesson 
 * @returns 
 */
const getCategories = async (lesson) => {
    const categories = await Lesson.find({_id: lesson}).select({categories: true});
    return categories;
}

const addCategory = async (lesson, category) => {
    
}

const deleteCategory = async (lesson, category) => {
    
}

const updateCategory = async (lesson, category, newCategory) => {
    
}

// cards
// showing the whole object?
const getCards = async (lesson, category) => {
    const cards = await Lesson.find({
        _id: lesson, 
        categories: {
            $elemMatch: {
                _id: category
            }
        }
    }, "categories.cards").limit(100);
    return cards; 

}

const addCard = async (lesson, category, card) => {

}

const deleteCard = async (lesson, category, card) => {
    
}

const upadteCard = async (lesson, category, card, newCard) => {
    
}


module.exports = {
    getLessons, 
    addLesson,
    deleteLesson, 
    updateLesson,
    getCategories,
    addCategory,
    deleteCategory,
    updateCategory,
    getCards,
    addCard,
    deleteCard,
    upadteCard
};