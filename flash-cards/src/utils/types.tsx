
export interface URLParams {
    lesson?: string,
    category?: string
}

export interface Lesson {
    _id: string,
    title: string,
}

export interface Category {
    _id: string;
    name: string;
}

export interface Card {
    _id: string;
    question: string;
    answer: string;
}