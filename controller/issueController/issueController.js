// controllers/issueController.js
import { validationResult } from 'express-validator';
import issueModel from '../../models/issueModel.js';
import { uploadImageMiddleware } from '../../helpers/uploadImageMiddleware.js';

export const createIssue = async (req, res) => {
    const errors = validationResult(req);
    const { description, imageUrl } = req.body;
    
    try {
        if (!description) {
            return res.status(400).json({ status: false, message: "Description is required" });
        }

        // let imageUrl = "";
        // if (req.files && req.files.image) {
        //     const image = req.files.image;
        //     const imageUrls = await uploadImageMiddleware(image, 'single');
        //     imageUrl = imageUrls[0];
        // }
        if (!req.userInfo || !req.userInfo.email) {
            return res.status(401).json({ status: false, message: "Unauthorized: User information is missing" });
        }

        const issue = new issueModel({
            description,
            imageUrl,
            raisedBy: req.userInfo.email,
        });

        await issue.save();
        return res.status(201).json({ status: true, message: "Issue raised successfully", issue });
    } catch (error) {
        console.error("Error creating issue:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const getIssues = async (req, res) => {
    try {
        const issues = await issueModel.find();
        return res.status(200).json({ status: true, issues });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const updateIssueStatus = async (req, res) => {
    const { issueId } = req.body;

    try {
        // Fetch the current issue
        const issue = await issueModel.findById(issueId);
        if (!issue) {
            return res.status(404).json({ status: false, message: "Issue not found" });
        }

        // Toggle the status
        const newStatus = issue.status === 'unresolved' ? 'resolved' : 'unresolved';

        // Update the status
        issue.status = newStatus;
        await issue.save();

        return res.status(200).json({ status: true, message: "Issue status updated successfully", issue });
    } catch (error) {
        console.error("Error updating issue status:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const deleteIssue = async (req, res) => {
    const { issueId } = req.query;

    try {
        const issue = await issueModel.findByIdAndDelete(issueId);
        if (!issue) {
            return res.status(404).json({ status: false, message: "Issue not found" });
        }
        return res.status(200).json({ status: true, message: "Issue deleted successfully" });
    } catch (error) {
        console.error("Error deleting issue:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
