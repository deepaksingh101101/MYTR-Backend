// models/consentModel.js
import mongoose from "mongoose";

const consentModelSchema = new mongoose.Schema({
    createdBy: String,
    updatedBy: String,
    patientName: String,
    patientId: {
        type: String,
        required: true,
    },
    mobileNo: String,
    adharCard: String,
    address: String,
    dob: String,
    gaurdianName: String,
    caseType: String,
    question: Object,
    gender: String,
    patientSignatureUrl: String,
    surgeonSignatureUrl: String,
    VideoUrl: String,
    relation: String,
    customFields: [{
        fieldName: String,
        option: String
    }],
    status: {
        type: String,
        enum: ['in-progress', 'submitted'],
        default: 'in-progress'
    }
}, {
    timestamps: true
});

const consentModel = mongoose.model("consent", consentModelSchema);
export default consentModel;
