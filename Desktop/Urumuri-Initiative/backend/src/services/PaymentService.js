import { AppDataSource } from "../config/db.js";
import { PaymentStatus } from "../entity/Payment.js";
import  LoanService  from "./LoanService.js";
import  BankTransferService from "./BankTransferService.js";

class PaymentService {
  constructor() {
    this.paymentRepository = AppDataSource.getRepository("Payment");
    this.employeeRepository = AppDataSource.getRepository("Employee");
    this.rnrsAccountRepository = AppDataSource.getRepository("RNRSAccount");
    this.loanService = new LoanService();
    this.bankTransferService = new BankTransferService();
  }

  async processMonthlyPayments() {
    console.log("Starting monthly payment processing...");

    const employees = await this.employeeRepository.find({
      where: { employmentStatus: "active" },
      relations: ["organization"],
    });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    for (const employee of employees) {
      try {
        // Check if payment already processed for this month
        const existingPayment = await this.paymentRepository.findOne({
          where: {
            employeeId: employee.id,
            paymentMonth: currentMonth,
            paymentYear: currentYear,
            status: PaymentStatus.COMPLETED,
          },
        });

        if (existingPayment) {
          console.log(
            `Payment already processed for employee ${employee.fullName}`
          );
          continue;
        }

        await this.processSingleEmployeePayment(
          employee,
          currentMonth,
          currentYear
        );
      } catch (error) {
        console.error(
          `Error processing payment for employee ${employee.fullName}:`,
          error
        );
      }
    }

    console.log("Monthly payment processing completed");
  }

  async processSingleEmployeePayment(employee, month, year) {
    const grossSalary = Number.parseFloat(employee.monthlySalary);

    // Check for active loan
    const activeLoan = await this.loanService.getActiveLoanByEmployee(
      employee.id
    );

    // Calculate deductions
    const loanDeduction = activeLoan
      ? Number.parseFloat(activeLoan.monthlyDeductionAmount)
      : 0;
    const savingsDeduction = (grossSalary * 1) / 100; // 1% for savings
    const rssbDeduction = (grossSalary * 1) / 100; // 1% for RSSB insurance

    const totalDeductions = loanDeduction + savingsDeduction + rssbDeduction;
    const netSalary = grossSalary - totalDeductions;

    // Create payment record
    const payment = this.paymentRepository.create({
      paymentReference: this.generatePaymentReference(),
      salaryCode: this.generateSalaryCode(),
      grossSalary,
      loanDeduction,
      savingsDeduction,
      rssbDeduction,
      netSalary,
      paymentDate: new Date(),
      paymentMonth: month,
      paymentYear: year,
      employeeId: employee.id,
      status: PaymentStatus.PROCESSING,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    try {
      // Process bank transfers
      await this.processPaymentTransfers(employee, savedPayment, activeLoan);

      // Update payment status
      savedPayment.status = PaymentStatus.COMPLETED;
      savedPayment.processedAt = new Date();

      await this.paymentRepository.save(savedPayment);

      // Update loan if exists
      if (activeLoan && loanDeduction > 0) {
        await this.loanService.updateLoanPayment(activeLoan.id, loanDeduction);
      }

      console.log(`Payment processed successfully for ${employee.fullName}`);
      return savedPayment;
    } catch (error) {
      // Update payment status to failed
      savedPayment.status = PaymentStatus.FAILED;
      savedPayment.failureReason = error.message;
      await this.paymentRepository.save(savedPayment);

      throw error;
    }
  }

  async processPaymentTransfers(employee, payment, activeLoan) {
    // Get RNRS accounts
    const mainAccount = await this.rnrsAccountRepository.findOne({
      where: { accountType: "main", isActive: true },
    });

    const savingsAccount = await this.rnrsAccountRepository.findOne({
      where: { accountType: "savings", isActive: true },
    });

    const rssbAccount = await this.rnrsAccountRepository.findOne({
      where: { accountType: "rssb", isActive: true },
    });

    if (!mainAccount || !savingsAccount || !rssbAccount) {
      throw new Error("Required RNRS accounts not found");
    }

    // Transfer net salary to employee's bank account
    const salaryTransfer = await this.bankTransferService.transferFunds({
      fromAccount: mainAccount.accountNumber,
      toAccount: employee.bankAccountNumber,
      toBankName: employee.bankName,
      amount: Number.parseFloat(payment.netSalary),
      reference: payment.paymentReference,
      description: `Salary payment for ${employee.fullName} - ${payment.paymentMonth}/${payment.paymentYear}`,
      recipientName: employee.bankAccountName,
    });

    // Transfer savings deduction to savings account
    if (payment.savingsDeduction > 0) {
      await this.bankTransferService.transferFunds({
        fromAccount: mainAccount.accountNumber,
        toAccount: savingsAccount.accountNumber,
        toBankName: savingsAccount.bankName,
        amount: Number.parseFloat(payment.savingsDeduction),
        reference: `SAV-${payment.paymentReference}`,
        description: `Savings deduction for ${employee.fullName}`,
        recipientName: employee.fullName,
      });
    }

    // Transfer RSSB deduction to RSSB account
    if (payment.rssbDeduction > 0) {
      await this.bankTransferService.transferFunds({
        fromAccount: mainAccount.accountNumber,
        toAccount: rssbAccount.accountNumber,
        toBankName: rssbAccount.bankName,
        amount: Number.parseFloat(payment.rssbDeduction),
        reference: `RSSB-${payment.paymentReference}`,
        description: `RSSB insurance for ${employee.fullName}`,
        recipientName: employee.fullName,
      });
    }

    payment.transactionId = salaryTransfer.transactionId;
  }

  generatePaymentReference() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `PAY${timestamp.slice(-8)}${random}`;
  }

  generateSalaryCode() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SAL${timestamp.slice(-8)}${random}`;
  }

  async getEmployeePayments(employeeId, limit = 12) {
    return await this.paymentRepository.find({
      where: { employeeId },
      order: { paymentDate: "DESC" },
      take: limit,
    });
  }

  async getPaymentByReference(paymentReference) {
    return await this.paymentRepository.findOne({
      where: { paymentReference },
      relations: ["employee"],
    });
  }

  async getPaymentsBySalaryCode(salaryCode) {
    return await this.paymentRepository.findOne({
      where: { salaryCode },
      relations: ["employee"],
    });
  }
}
export default PaymentService;
