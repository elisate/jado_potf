import express from 'express';
import { createAgent,getAgentById,getAgentsByBranch,updateAgent,deleteAgent,getAgentActivities,getAllAgents} from '../controller/AgentController.js';
import { authenticateToken, authorize } from '../middleware/authenthicateToken.js';

const router = express.Router();

router.post('/createAgent', authenticateToken, authorize('admin'), createAgent);
router.get("/getAgentActivities",authenticateToken,authorize('agent'),getAgentActivities)
router.get("/getAllAgent",authenticateToken,authorize('admin'),getAllAgents)
router.get("/getAgentbyBranch/:branch",authenticateToken,authorize('admin'),getAgentsByBranch)
router.delete("/deleteAgent/:id",authenticateToken,authorize("admin"),deleteAgent)
router.put("/updateAgent/:id",authenticateToken,authorize("admin"),updateAgent)
export default router;
