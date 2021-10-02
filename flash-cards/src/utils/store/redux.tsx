import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCards, getCategories } from '../server/serverCalls';
import { Category, Card } from '../types';


interface Cards {
    all: Card[];
    correct: Card[];
    incorrect: Card[];
}

const initialLesson = "";
const initialCategory = "";
const categories: Category[] = [];
const cards: Cards = {
    all: [],
    correct: [],
    incorrect: []
};

// fetch the categories
export const fetchCategories = createAsyncThunk(
    "lesson/fetchCategories",
    // eslint-disable-next-line
    async ({lesson}: {lesson: string}, thunkAPI) => {
        const categories = await getCategories(lesson);
        return categories;
    }
);

// fetch the cards from given category
export const fetchCards = createAsyncThunk(
    "cards/fetchCards",
    // eslint-disable-next-line
    async ({lesson, category}: {lesson: string, category: string}, thunkAPI) => {
        const cards = await getCards(lesson, category);
        return cards;
    }
);




// lesson slice
// select lesson
const lessonSlice = createSlice({
    name: "lesson",
    initialState: initialLesson,
    reducers: {
        selectLesson: (state, action) => action.payload 
    }
});

// category slice
// select category
const categorySlice = createSlice({
    name: "category",
    initialState: initialCategory,
    reducers: {
        selectCategory: (state, action) => action.payload 
    }
});

// current categories
const categoriesSlice = createSlice({
    name: "categories",
    initialState: categories,
    reducers: {
        addCategoryReducer: (state, action) => {
            state.push(action.payload);
            return state;
        },
        deleteCategoryReducer: (state, action) => state.filter(elem => elem.name !== action.payload),
        updateCategoryReducer: (state, action) => state.map(elem => {
            if (elem.name === action.payload.old){
                return {
                    ...elem,
                    name: action.payload.category
                };
            }
            return elem;
        })
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => action.payload);
    }
});

// cards slice
const cardsSlice = createSlice({
    name: "cards",
    initialState: cards,
    reducers: {
        // eslint-disable-next-line
        clearCards: (state) => cards,
        addCardReducer: (state, action) => {
            state.all.push(action.payload);
        },
        deleteCardReducer: (state, action) => {
            const newState = state.all.filter((elem: Card) => elem._id !== action.payload);
            state.all = newState;
            return state;
        },
        skipCardReducer: (state) => {
            const first = state.all.shift();
            if (first){
                state.all.push(first);
            }
        },
        // correct answers
        addCorrect: (state, action) => {
            state.correct.push(action.payload);
        },
        deleteCorrect: (state, action) => {
            const result = state.correct.filter(elem => elem._id !== action.payload);
            return {
                ...state, 
                correct: result
            };
        },
        updateCorrect: (state, action) => {
            const result = state.correct.map(elem => {
                const card: Card = action.payload;
                if (elem._id === card._id){
                    return {
                        _id: card._id,
                        question: card.question,
                        answer: card.answer
                    };
                }
                return elem;
            });
            return {
                ...state, 
                correct: result
            };
        },
        // incorrect answers
        addIncorrect: (state, action) => {
            state.incorrect.push(action.payload);
        }, 
        deleteIncorrect: (state, action) => {
            const result = state.incorrect.filter(elem => elem._id !== action.payload);
            return {
                ...state, 
                incorrect: result
            };
        },
        updateIncorrect: (state, action) => {
            const result = state.incorrect.map(elem => {
                const card = action.payload;
                if (elem._id === card._id){
                    return {
                        _id: card._id,
                        question: card.question,
                        answer: card.answer
                    };
                }
                return elem;
            });
            return {
                ...state, 
                incorrect: result
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.all = action.payload;
        });
    }
});

// export actions
export const {
    selectLesson
} = lessonSlice.actions;

export const {
    selectCategory,
} = categorySlice.actions;

export const {
    addCategoryReducer,
    updateCategoryReducer,
    deleteCategoryReducer
} = categoriesSlice.actions;


export const {
    clearCards,
    addCardReducer,
    addCorrect, 
    deleteCorrect,
    updateCorrect,
    addIncorrect, 
    deleteIncorrect,
    updateIncorrect,
    deleteCardReducer, 
    skipCardReducer
} = cardsSlice.actions;

const reducer = {
    lesson: lessonSlice.reducer,
    category: categorySlice.reducer,
    categories: categoriesSlice.reducer, 
    cards: cardsSlice.reducer
};

export const store = configureStore({reducer});