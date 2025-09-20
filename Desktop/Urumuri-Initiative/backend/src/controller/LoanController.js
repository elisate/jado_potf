import LoanService from "../services/LoanService.js";

class LoanController {
  constructor() {
    this.loanService = new LoanService();
  }

  async requestLoan(req, res) {
    try {
      const { employeeId, loanAmount, purpose, loanType, requestedWeeks } =
        req.body;

      if (!employeeId || !loanAmount) {
        return res.status(400).json({
          success: false,
          message: "Employee ID and loan amount are required",
        });
      }

      // Check if user can request loan for this employee
      if (req.user.role === "employee" && req.user.employeeId !== employeeId) {
        return res.status(403).json({
          success: false,
          message: "You can only request loans for yourself",
        });
      }

      const loan = await this.loanService.requestLoan(
        employeeId,
        loanAmount,
        purpose,
        loanType || "salary_advance",
        requestedWeeks
      );

      res.status(201).json({
        success: true,
        message: "Loan request submitted successfully",
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async approveLoan(req, res) {
    try {
      const { loanId } = req.params;
      const { comments } = req.body;

      const loan = await this.loanService.approveLoan(
        loanId,
        req.user.id,
        req.user.role,
        comments
      );

      res.json({
        success: true,
        message: "Loan approved successfully",
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async activateLoan(req, res) {
    try {
      const { loanId } = req.params;

      const loan = await this.loanService.activateLoan(loanId);

      res.json({
        success: true,
        message: "Loan activated successfully",
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPendingLoans(req, res) {
    try {
      const loans = await this.loanService.getPendingLoansForApproval(
        req.user.id,
        req.user.role,
        req.user.organizationId
      );

      res.json({
        success: true,
        data: loans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getEmployeeLoans(req, res) {
    try {
      const { employeeId } = req.params;

      // Check if user can view loans for this employee
      if (req.user.role === "employee" && req.user.employeeId !== employeeId) {
        return res.status(403).json({
          success: false,
          message: "You can only view your own loans",
        });
      }

      const loans = await this.loanService.getLoansByEmployee(employeeId);

      res.json({
        success: true,
        data: loans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getActiveLoan(req, res) {
    try {
      const { employeeId } = req.params;

      // Check if user can view loans for this employee
      if (req.user.role === "employee" && req.user.employeeId !== employeeId) {
        return res.status(403).json({
          success: false,
          message: "You can only view your own loans",
        });
      }

      const loan = await this.loanService.getActiveLoanByEmployee(employeeId);

      res.json({
        success: true,
        data: loan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getApprovedLoans(req, res) {
    try {
      const loans = await this.loanService.getApprovedLoans(
        req.user.id,
        req.user.role,
        req.user.organizationId
      );

      res.json({
        success: true,
        data: loans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default LoanController;
