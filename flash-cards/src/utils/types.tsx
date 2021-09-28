
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

export interface SimpleCard {
    question: string;
    answer: string;
}

// export interface Card {
//     _id: string;
//     question: string;
//     answer: string;
// }

// not working? 
export interface Card extends SimpleCard{
    _id: string;
}