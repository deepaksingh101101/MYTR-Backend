import express from 'express';
import { getAdminAnalytics, getGenderAnalytics, getCaseTypeAnalytics,getAgeAnalytics,getConsentStatusCounts,getConsentFormAnalytics} from '../controller/analyticsController/analyticsController.js';
import { isLogedIn } from '../middleware/isLogedIn.js';
import { isSuperAdmin } from '../middleware/isSuperAdmin.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/admin', isLogedIn, isSuperAdmin, getAdminAnalytics);
analyticsRouter.get('/gender', isLogedIn, isSuperAdmin, getGenderAnalytics);
analyticsRouter.get('/caseTypes', isLogedIn, isSuperAdmin, getCaseTypeAnalytics);
analyticsRouter.get('/age', isLogedIn,isSuperAdmin, getAgeAnalytics);
analyticsRouter.get('/getConsentStatusCounts', isLogedIn,isSuperAdmin, getConsentStatusCounts);
analyticsRouter.get('/getConsentFormAnalytics', isLogedIn,isSuperAdmin, getConsentFormAnalytics);

export default analyticsRouter;
