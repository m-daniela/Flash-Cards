
export const routes = {
    lessons: "/",
    categories: "/:lesson",
    card: "/:lesson/:category",
    review: "/:lesson/:category/review"
};


export const port = 5000;

export const main = `http://localhost:${port}/`;
export const lessons = `${main}lessons`;