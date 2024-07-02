// models/issueModel.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    raisedBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['resolved', 'unresolved'],
        default: 'unresolved'
    }
}, {
    timestamps: { createdAt: 'raiseDate', updatedAt: true }
});

const issueModel = mongoose.model('Issue', issueSchema);
export default issueModel;
