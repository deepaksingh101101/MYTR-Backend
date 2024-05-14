import mongoose from "mongoose";

// Schema for individual questions
const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

// Schema for the main template
const templateModelSchema = new mongoose.Schema({
    caseType: {
        type: String,
        required: true
    },
    questions: [questionSchema], // Array of questions referencing the question schema
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    }
}, {
    timestamps: true
});

const templateModel = mongoose.model("template", templateModelSchema);
export default templateModel;


