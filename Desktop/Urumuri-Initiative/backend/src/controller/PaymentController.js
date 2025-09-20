import  PaymentService  from "../services/PaymentService.js";
import  SchedulerService  from "../services/SchedulerService.js";

class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
    this.schedulerService = new SchedulerService();
  }

  async processMonthlyPayments(req, res) {
    try {
      await this.paymentService.processMonthlyPayments();

      res.json({
        success: true,
        message: "Monthly payments processed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getEmployeePayments(req, res) {
    try {
      const { employeeId } = req.params;
      const { limit } = req.query;

      const payments = await this.paymentService.getEmployeePayments(
        employeeId,
        limit ? Number.parseInt(limit) : 12
      );

      res.json({
        success: true,
        data: payments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPaymentByReference(req, res) {
    try {
      const { reference } = req.params;

      const payment = await this.paymentService.getPaymentByReference(
        reference
      );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      res.json({
        success: true,
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPaymentBySalaryCode(req, res) {
    try {
      const { salaryCode } = req.params;

      const payment = await this.paymentService.getPaymentsBySalaryCode(
        salaryCode
      );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      res.json({
        success: true,
        data: payment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async triggerManualPayment(req, res) {
    try {
      await this.schedulerService.triggerMonthlyPayments();

      res.json({
        success: true,
        message: "Manual payment processing triggered successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default PaymentController;
