const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    categories: [
        {
            _id: ObjectId,
            name: {
                type: String,
                required: true, 
                unique: true
            },
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