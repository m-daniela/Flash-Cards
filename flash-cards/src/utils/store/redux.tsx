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
    async ({lesson}: {lesson: string}, thunkAPI) => {
        const categories = await getCategories(lesson);
        return categories;
    }
);

// fetch the cards from given category
export const fetchCards = createAsyncThunk(
    "cards/fetchCards",
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => action.payload);
    }
});

// cards slice
const cardsSlice = createSlice({
    name: "cards",
    initialState: cards,
    reducers: {
        addCorrect: (state, action) => {
            state.correct = action.payload;
        },
        addIncorrect: (state, action) => {
            state.incorrect = action.payload;
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
    selectCategory
} = categorySlice.actions;

export const {
    addCorrect, 
    addIncorrect
} = cardsSlice.actions;

const reducer = {
    lesson: lessonSlice.reducer,
    category: categorySlice.reducer,
    categories: categoriesSlice.reducer, 
    cards: cardsSlice.reducer
};

export const store = configureStore({reducer});