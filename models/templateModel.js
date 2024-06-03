import mongoose from "mongoose";

// Schema for individual questions
const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});
// Schema for individual FAQs

const faqSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },

    imageUrl:[String],

    videoUrl:{
        type:String,
        required:true
    }
})

const optionSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:[String],
    videoUrl:{
        type:String,
    }
});

const customFieldSchema= new mongoose.Schema({
    fieldName:{
        type:String,
        required:true,
    },
    options:[optionSchema]
})
// Schema for the main template
const templateModelSchema = new mongoose.Schema({

    caseType: {
        type: String,
        required: true
    },

    imageUrl:[String],
    questions: [questionSchema], // Array of questions referencing the question schema
    faqs:[faqSchema],//array of faqs referencing the faq schema
    customFields:[customFieldSchema],//array of custom fields referencing to the customfieldSchema
    videoUrl:{
        type:String,
        required:true,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    html:{
        type:String
    },
    deltaForm:{
        type:Object
    }
}, {
    timestamps: true
});

const templateModel = mongoose.model("template", templateModelSchema);
export default templateModel;


