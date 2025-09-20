import express from "express";
import LoanController from "../controller/LoanController.js";
import {
  authenticateToken,
  authorize,
} from "../middleware/authenthicateToken.js";
import { UserRole } from "../entity/userEntity.js";

const router = express.Router();
const loanController = new LoanController();



// Loan management routes
router.post("/request", (req, res) => loanController.requestLoan(req, res));

router.put(
  "/:loanId/approve",
   authenticateToken,
  authorize(UserRole.AGENT),
  (req, res) => loanController.approveLoan(req, res)
);

router.put(
  "/:loanId/activate",
  authorize(UserRole.AGENT, UserRole.ADMIN),
  (req, res) => loanController.activateLoan(req, res)
);

router.get(
  "/pending",
  authorize(UserRole.AGENT, UserRole.ORGANIZATION, UserRole.ADMIN),
  (req, res) => loanController.getPendingLoans(req, res)
);

router.get(
  "/approved",
  authorize(UserRole.AGENT, UserRole.ORGANIZATION, UserRole.ADMIN),
  (req, res) => loanController.getApprovedLoans(req, res)
);

router.get("/employee/:employeeId", (req, res) =>
  loanController.getEmployeeLoans(req, res)
);
router.get("/employee/:employeeId/active", (req, res) =>
  loanController.getActiveLoan(req, res)
);

export default router;
