import { AppDataSource } from "../config/db.js";
import { LoanStatus } from "../entity/Loan.js";

class LoanService {
  constructor() {
    this.loanRepository = AppDataSource.getRepository("Loan");
    this.employeeRepository = AppDataSource.getRepository("Employee");
  }

  async requestLoan(
    employeeId,
    loanAmount,
    purpose = null,
    loanType = "salary_advance",
    requestedWeeks = null
  ) {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
      relations: ["organization"],
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (!employee.organization.loanEligible) {
      throw new Error("Organization is not eligible for loans");
    }

    // Check if employee has an active loan
    const activeLoan = await this.loanRepository.findOne({
      where: {
        employeeId,
        status: LoanStatus.ACTIVE,
      },
    });

    if (activeLoan) {
      throw new Error("Employee already has an active loan");
    }

    // Validate loan amount based on type
    const monthlySalary = Number.parseFloat(employee.monthlySalary);
    let maxLoanAmount = 0;

    switch (loanType) {
      case "weekly_advance":
        // Maximum 1 week salary
        maxLoanAmount = monthlySalary / 4;
        break;
      case "salary_advance":
        // Maximum 50% of monthly salary
        maxLoanAmount = monthlySalary * 0.5;
        break;
      case "emergency_loan":
        // Maximum 2 months salary
        maxLoanAmount = monthlySalary * 2;
        break;
      default:
        maxLoanAmount = monthlySalary * 0.5;
    }

    if (Number.parseFloat(loanAmount) > maxLoanAmount) {
      throw new Error(
        `Loan amount exceeds maximum allowed (${maxLoanAmount}) for ${loanType}`
      );
    }

    // Calculate monthly deduction (4% of monthly salary)
    const monthlyDeductionAmount = (monthlySalary * 4) / 100;

    const loanCode = this.generateLoanCode();

    const loan = this.loanRepository.create({
      loanCode,
      loanAmount: Number.parseFloat(loanAmount),
      remainingAmount: Number.parseFloat(loanAmount),
      monthlyDeductionAmount,
      employeeId,
      requestDate: new Date(),
      purpose,
      loanType,
      requestedWeeks,
      status: LoanStatus.PENDING,
    });

    return await this.loanRepository.save(loan);
  }

  async approveLoan(loanId, approverId, approverRole, comments = null) {
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
      relations: ["employee"],
    });

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status !== LoanStatus.PENDING) {
      throw new Error("Loan is not in pending status");
    }

    loan.status = LoanStatus.APPROVED;
    loan.approvalDate = new Date();
    loan.approvedBy = approverId;
    loan.approvedByRole = approverRole;
    loan.approvalComments = comments;

    return await this.loanRepository.save(loan);
  }

  async activateLoan(loanId) {
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
    });

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status !== LoanStatus.APPROVED) {
      throw new Error("Loan must be approved before activation");
    }

    loan.status = LoanStatus.ACTIVE;
    return await this.loanRepository.save(loan);
  }

  async getActiveLoanByEmployee(employeeId) {
    return await this.loanRepository.findOne({
      where: {
        employeeId,
        status: LoanStatus.ACTIVE,
      },
    });
  }

  async updateLoanPayment(loanId, paymentAmount) {
    const loan = await this.loanRepository.findOne({
      where: { id: loanId },
    });

    if (!loan) {
      throw new Error("Loan not found");
    }

    loan.amountPaid =
      Number.parseFloat(loan.amountPaid) + Number.parseFloat(paymentAmount);
    loan.remainingAmount =
      Number.parseFloat(loan.remainingAmount) -
      Number.parseFloat(paymentAmount);

    // Check if loan is fully paid
    if (loan.remainingAmount <= 0) {
      loan.status = LoanStatus.COMPLETED;
      loan.completionDate = new Date();
      loan.remainingAmount = 0;
    }

    return await this.loanRepository.save(loan);
  }

  generateLoanCode() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LOAN${timestamp.slice(-6)}${random}`;
  }

  async getLoansByEmployee(employeeId) {
    return await this.loanRepository.find({
      where: { employeeId },
      order: { createdAt: "DESC" },
    });
  }

  async getLoanHistory(employeeId, limit = 10) {
    return await this.loanRepository.find({
      where: { employeeId },
      order: { createdAt: "DESC" },
      take: limit,
    });
  }

  async getPendingLoansForApproval(userId, userRole, organizationId = null) {
    const whereCondition = { status: LoanStatus.PENDING };

    // If organization admin, only show loans from their organization
    if (userRole === "organization_admin" && organizationId) {
      const loans = await this.loanRepository
        .createQueryBuilder("loan")
        .leftJoinAndSelect("loan.employee", "employee")
        .leftJoinAndSelect("employee.organization", "organization")
        .where("loan.status = :status", { status: LoanStatus.PENDING })
        .andWhere("organization.id = :organizationId", { organizationId })
        .orderBy("loan.requestDate", "ASC")
        .getMany();

      return loans;
    }

    // Agents and super admins can see all pending loans
    return await this.loanRepository.find({
      where: whereCondition,
      relations: ["employee", "employee.organization"],
      order: { requestDate: "ASC" },
    });
  }

  async getApprovedLoans(userId, userRole, organizationId = null) {
    // If organization admin, only show approved loans from their organization
    if (userRole === "organization_admin" && organizationId) {
      const loans = await this.loanRepository
        .createQueryBuilder("loan")
        .leftJoinAndSelect("loan.employee", "employee")
        .leftJoinAndSelect("employee.organization", "organization")
        .where("loan.status = :status", { status: LoanStatus.APPROVED })
        .andWhere("organization.id = :organizationId", { organizationId })
        .orderBy("loan.approvalDate", "DESC")
        .getMany();

      return loans;
    }

    // Agents and super admins can see all approved loans
    return await this.loanRepository.find({
      where: { status: LoanStatus.APPROVED },
      relations: ["employee", "employee.organization"],
      order: { approvalDate: "DESC" },
    });
  }
}

export default LoanService;
