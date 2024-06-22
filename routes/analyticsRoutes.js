import express from 'express';
import { getAdminAnalytics, getGenderAnalytics, getCaseTypeAnalytics,getAgeAnalytics,getTotalAdmins,getRecentConsents,getTotalConsents} from '../controller/analyticsController/analyticsController.js';
import { isLogedIn } from '../middleware/isLogedIn.js';
import { isSuperAdmin } from '../middleware/isSuperAdmin.js';


const analyticsRouter = express.Router();

analyticsRouter.get('/admin', isLogedIn, isSuperAdmin, getAdminAnalytics);
analyticsRouter.get('/gender', isLogedIn, isSuperAdmin, getGenderAnalytics);
analyticsRouter.get('/caseTypes', isLogedIn, isSuperAdmin, getCaseTypeAnalytics);
analyticsRouter.get('/age', isLogedIn,isSuperAdmin, getAgeAnalytics);
analyticsRouter.get('/getTotalConsent', isLogedIn,isSuperAdmin, getTotalConsents);
analyticsRouter.get('/getAdmincount', isLogedIn,isSuperAdmin, getTotalAdmins);
analyticsRouter.get('/getRecentConsents', isLogedIn, isSuperAdmin,getRecentConsents);


export default analyticsRouter;
