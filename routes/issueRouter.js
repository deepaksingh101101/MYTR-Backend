// routes/issueRoutes.js
import express from "express";
import { isLogedIn } from "../middleware/isLogedIn.js";
import fileUpload from 'express-fileupload';
import { createIssue, getIssues, updateIssueStatus, deleteIssue } from "../controller/issueController/issueController.js";

const issueRouter = express.Router();

issueRouter.post('/createIssue', isLogedIn, createIssue);
issueRouter.get('/getIssues', isLogedIn, getIssues);
issueRouter.patch('/updateIssueStatus', isLogedIn, updateIssueStatus);
issueRouter.delete('/deleteIssue', isLogedIn, deleteIssue);

export default issueRouter;
