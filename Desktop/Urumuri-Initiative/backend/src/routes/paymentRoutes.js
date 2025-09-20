import express from "express";
import  PaymentController from "../controller/PaymentController.js";
import { authenticateToken, authorize } from "../middleware/authenthicateToken.js";
import { UserRole } from "../entity/userEntity.js";

const router = express.Router();
const paymentController = new PaymentController();

// All payment routes require authentication
router.use(authenticateToken);

// Payment processing routes (restricted to agents and super admins)
router.post(
  "/process-monthly",
  authorize(UserRole.AGENT, UserRole.SUPER_ADMIN),
  (req, res) => paymentController.processMonthlyPayments(req, res)
);

router.post(
  "/trigger-manual",
  authorize(UserRole.AGENT, UserRole.SUPER_ADMIN),
  (req, res) => paymentController.triggerManualPayment(req, res)
);

// Payment viewing routes
router.get("/employee/:employeeId", (req, res) =>
  paymentController.getEmployeePayments(req, res)
);
router.get("/reference/:reference", (req, res) =>
  paymentController.getPaymentByReference(req, res)
);
router.get("/salary-code/:salaryCode", (req, res) =>
  paymentController.getPaymentBySalaryCode(req, res)
);

export default router;
