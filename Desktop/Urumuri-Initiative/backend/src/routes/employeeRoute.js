import express from 'express';
import { addEmployee, getEmployeesByOrganization,getUnapprovedEmployees,getEmployeeById,updateEmployee,deleteEmployee,
    approveEmployee,getApprovedEmployees} from '../controller/employeeController.js';
import { authenticateToken, authorize } from '../middleware/authenthicateToken.js';

const router = express.Router();

router.post('/addEmployee', addEmployee);
router.get('/allEmployee', authenticateToken, authorize('organization'), getEmployeesByOrganization);
router.put("/updateEmployee/:id",authenticateToken,authorize("organization"),updateEmployee)
router.delete("/deleteEmployee/:id",authenticateToken,authorize("organization"),deleteEmployee)
router.get("/getEmployee/:id",getEmployeeById)
router.get('/unapprovedEmployees', authenticateToken, authorize('organization'), getUnapprovedEmployees);
router.get('/approvedEmployees', authenticateToken, authorize('organization'), getApprovedEmployees);
router.put('/approveEmployee/:id', authenticateToken, authorize('organization'), approveEmployee);

export default router;
