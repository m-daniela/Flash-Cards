const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    _id: String,
    categories: [
        {
            _id: String,
            cards: [
                {
                    _id: ObjectId,
                    question: {
                        type: String, 
                        required: true
                    },
                    answer: {
                        type: String, 
                        required: true
                    }
                }
            ]
        }
    ]
});

const Lesson = mongoose.model("lesson", lessonSchema);

module.exports  = Lesson;