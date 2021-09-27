const Lesson = require("../model/lesson");
const mongoose = require("mongoose");


// lessons

// get all lessons
const getLessons = async () => {
    return await Lesson.find({}, "-categories");
}

/**
 * add lesson
 * @param {string} lesson title of the lesson to be added
 * @returns query result
 */
const addLesson = async (lesson) => {
    const newLesson = new Lesson({
        title: lesson
    });
    return newLesson.save()
        .then((res) => res)
        .catch((err) => {
            console.log("Database add lesson error", err);
            return {};
        });
}

/**
 * delete the given lesson document, if found
 * @param {string} lesson title of the lesson to be deleted
 * @returns query result
 */
const deleteLesson = async (lesson) => {
    return await Lesson.deleteOne({title: lesson});
}


/**
 * update the title of the given lesson document
 * with the new lesson name
 * if it doesn't exist, it will not be inserted
 * @param {string} lesson title of the lesson to be updated
 * @param {string} newLesson the new title
 * @returns query result
 */
const updateLesson = async (lesson, newLesson) => {
    return await Lesson.updateOne({title: lesson}, 
        {
            $set: {
                title: newLesson
            }
        });
}


// categories


/**
 * get the categories from a specified lesson
 * @param {string} lesson title of the lesson 
 * @returns list of categories (object with the list)
 */
const getCategories = async (lesson) => {
    return await Lesson.find({title: lesson});
}

/**
 * add a category for the given lesson
 * @param {string} lesson title of the lesson
 * @param {string} category category name 
 * @returns query result
 */
const addCategory = async (lesson, category) => {
    return await Lesson.updateOne({title: lesson},
        {
            $push: {
                categories: {
                    _id: mongoose.Types.ObjectId(),
                    name: category
                }
            }
        }
    )
}


/**
 * delete the given category from the categories list 
 * in the selected lesson
 * @param {string} lesson title of lesson
 * @param {string} category name to be deleted
 * @returns query result
 */
const deleteCategory = async (lesson, category) => {
    return await Lesson.updateOne({title: lesson}, 
        {
            $pull: {
                categories: {
                    name: category
                }
            }
        });
}

/**
 * update given category from the lesson
 * @param {string} lesson title of lesson
 * @param {string} category name of category
 * @param {string} newCategory new category name
 * @returns query result
 */
const updateCategory = async (lesson, category, newCategory) => {
    return await Lesson.updateOne({title: lesson, "categories.name": category}, 
        {
            $set: {
                "categories.$.name": newCategory
            }
        });
}

/**
 * get all cards from the given category of the lesson
 * @param {string} lesson lesson title
 * @param {string} category category name
 * @returns object with the list of cards
 */
const getCards = async (lesson, category) => {
    return await Lesson.find({
        title: lesson, 
        categories: {
            $elemMatch: {
                name: category
            }
        }
    }, "-_id categories.cards.$").limit(100);

}

/**
 * add a new card in the given category
 * @param {string} lesson lesson title
 * @param {string} category category name
 * @param {Object} card card object, with question and answer
 * @returns query result
 */
const addCard = async (lesson, category, card) => {
    return await Lesson.updateOne(
        {
            title: lesson,
            categories: {
                $elemMatch: {
                    name: category
                }
            }
        },
        {
            $push: {
                "categories.$.cards": {
                    _id: mongoose.Types.ObjectId(),
                    ...card
                }
            }
        }
    )
}

/**
 * delete the given card from the list of card
 * @param {string} lesson lesson title
 * @param {string} category category name
 * @param {string} cardId id of card to be deleted
 * @returns 
 */
const deleteCard = async (lesson, category, cardId) => {
    return await Lesson.updateOne(
        {
            title: lesson,
            categories: {
                $elemMatch: {
                    name: category
                }
            }
        },
        {
            $pull: {
                "categories.$.cards": {
                    _id: cardId
                }
            }
        }
    )
}

/**
 * update the given card
 * @param {string} lesson lesson title
 * @param {string} category category name
 * @param {string} cardId card id
 * @param {Object} newCard card object, with question and answer (strings)
 * @returns query results
 */

const updateCard = async (lesson, category, cardId, newCard) => {
    return await Lesson.updateOne(
        {
            title: lesson,
            "categories.name": category, 
            "categories.$.cards._id": cardId
        },
        {
            $set: {
                "categories.$.cards.$[i]": {
                    _id: cardId, 
                    ...newCard
                }
            }
        },
        {
            arrayFilters: [{
                "i._id": mongoose.Types.ObjectId(cardId)
            }]
        }
    )
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
    updateCard
};