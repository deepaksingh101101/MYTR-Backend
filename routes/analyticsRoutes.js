import express from 'express';
import { getAdminAnalytics, getGenderAnalytics, getCaseTypeAnalytics } from '../controller/analyticsController/analyticsController.js';
import { isLogedIn } from '../middleware/isLogedIn.js';
import { isSuperAdmin } from '../middleware/isSuperAdmin.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/admin', isLogedIn, isSuperAdmin, getAdminAnalytics);
analyticsRouter.get('/gender', isLogedIn, isSuperAdmin, getGenderAnalytics);
analyticsRouter.get('/caseTypes', isLogedIn, isSuperAdmin, getCaseTypeAnalytics);

export default analyticsRouter;
