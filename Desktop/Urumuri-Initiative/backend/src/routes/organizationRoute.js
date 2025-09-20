import express from 'express';
import { createOrganization,
  getOrganizationsByAgentCode,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization,
  approveOrganization,
  getApprovedOrganizations,
  getUnapprovedOrganizations,
  signContract,
  getOrganizationById,
  approveContract
} from '../controller/OrganizationController.js';
import { authenticateToken, authorize } from '../middleware/authenthicateToken.js';
import upload from '../middleware/multerGeneral.js';
const router = express.Router();
router.post('/createOrganization', upload.single('certificate'), createOrganization);
router.get("/assignedOrganizations", authenticateToken, authorize("agent"), getOrganizationsByAgentCode);
router.get("/getAllOrganization", authenticateToken, authorize("admin"), getAllOrganizations);
router.put("/update/:id", authenticateToken, authorize("agent"), updateOrganization);
router.delete("/delete/:id", authenticateToken, authorize("agent"), deleteOrganization);
router.post("/approveOrganization/:id", authenticateToken, authorize("agent"), approveOrganization);
router.get("/getApprovedOrganizations", authenticateToken, authorize("admin"), getApprovedOrganizations);
router.get("/getUnapprovedOrganizations", authenticateToken, authorize("agent"), getUnapprovedOrganizations);
router.patch("/signContract/:id", signContract);
router.get("/getOrganizationbyId/:id", authenticateToken, authorize("agent"), getOrganizationById);
router.patch("/approveContract/:id", authenticateToken, authorize("agent"), approveContract);

export default router;