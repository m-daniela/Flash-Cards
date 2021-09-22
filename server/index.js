const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const {getLessons, 
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
    upadteCard} = require("./utils/database");

const {endpoints} = require("./utils/constants");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// lessons

app.get(endpoints.lessons, (req, res) => {
    console.log("GET", endpoints.lessons);
    getLessons()
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err)
        });
});

app.post(endpoints.addLesson, (req, res) => {
    console.log("POST", endpoints.addLesson);
    const lesson = req.body.title;
    addLesson(lesson)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err)
        });

});

app.delete(endpoints.deleteLesson, (req, res) => {
    console.log("DELETE", endpoints.deleteLesson);
    const lesson = req.params.lesson;
    res.json({lesson});

});

app.post(endpoints.updateLesson, (req, res) => {
    console.log("POST", endpoints.updateLesson);
    const lesson = req.params.lesson;
    const newLesson = req.body.lesson;
    res.json({lesson, newLesson});

});

// categories

app.get(endpoints.categories, (req, res) => {
    console.log("GET", endpoints.categories);
    const lesson = req.params.lesson;
    getCategories(lesson)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err)
        });
});

app.post(endpoints.addCategory, (req, res) => {
    console.log("POST", endpoints.addCategory);
    const category = req.body.category;
    res.json({category});

});

app.delete(endpoints.deleteCategory, (req, res) => {
    console.log("DELETE", endpoints.deleteCategory);
    const {lesson, category} = req.params;
    res.json({lesson, category});

});

app.post(endpoints.updateCategory, (req, res) => {
    console.log("POST", endpoints.updateCategory);
    const {lesson, category} = req.params;
    const newCategory = req.body.category;
    res.json({lesson, category, newCategory});

});

// cards

app.get(endpoints.cards, (req, res) => {
    console.log("GET", endpoints.cards);
    const {lesson, category} = req.params;
    getCards(lesson, category)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err)
        });

});

app.post(endpoints.addCard, (req, res) => {
    console.log("POST", endpoints.addCard);
    const {lesson, category} = req.params;
    const card = req.body.card;
    res.json({lesson, category, card});

});

app.delete(endpoints.deleteCard, (req, res) => {
    console.log("DELETE", endpoints.deleteCard);
    const {lesson, category, card} = req.params;
    res.json({lesson, category, card});

});

app.post(endpoints.updateCard, (req, res) => {
    console.log("POST", endpoints.updateCard);
    const {lesson, category, card} = req.params;
    const newCard = req.body.card;
    res.json({lesson, category, card, newCard});


});
 

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Database connection successful");
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => console.log("Database connection failed", err));
