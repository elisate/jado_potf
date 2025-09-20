//starting line of Mireille
import Agent from './agentRoute.js';
import User from './authRoute.js';
import Organization from './organizationRoute.js';
import Employee from './employeeRoute.js';

//ending line of Mireille

//starting line of Deborah
import Loan from './loanRoutes.js';
import Payment from './paymentRoutes.js';
//ending line of Deborah

import express from 'express';
const router = express.Router();
//mireille
router.use('/user', User);
router.use('/agent', Agent);
router.use('/organization', Organization);
router.use('/employee', Employee);
//mireille

//deborah
router.use('/loan', Loan);
router.use('/payment', Payment);

//deborah

export default router;
