const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const {endpoints} = require("./utils/constants");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// lessons

app.get(endpoints.lessons, (req, res) => {
    console.log("GET", endpoints.lessons);
    res.json("Lessons");
});

app.post(endpoints.addLesson, (req, res) => {
    console.log("POST", endpoints.addLesson);
    const lesson = req.body.lesson;
    res.json({lesson});

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
    res.json("Categories");
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
    res.json("Cards");
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
 
app.listen(port, () => {
  // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
  console.log(`Server is running on port: ${port}`);
});