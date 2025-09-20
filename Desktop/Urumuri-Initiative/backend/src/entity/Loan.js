import { EntitySchema } from "typeorm";

export const LoanStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  ACTIVE: "active",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

const Loan = new EntitySchema({
    name: "Loan",
    tableName: "loans",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        loanCode: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        loanAmount: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },
        amountPaid: {
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
        },
        remainingAmount: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },
        monthlyDeductionPercentage: {
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 4.0,
        },
        monthlyDeductionAmount: {
            type: "decimal",
            precision: 10,
            scale: 2,
        },
        status: {
            type: "enum",
            enum: Object.values(LoanStatus),
            default: LoanStatus.PENDING,
        },
        requestDate: {
            type: "date",
        },
        approvalDate: {
            type: "date",
            nullable: true,
        },
        completionDate: {
            type: "date",
            nullable: true,
        },
        purpose: {
            type: "text",
            nullable: true,
        },
        employeeId: {
            type: "uuid",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
        approvedBy: {
            type: "uuid",
            nullable: true,
        },
        approvedByRole: {
            type: "varchar",
            length: 50,
            nullable: true,
        },
        approvalComments: {
            type: "text",
            nullable: true,
        },
        loanType: {
            type: "varchar",
            length: 50,
            default: "salary_advance", // 'salary_advance', 'weekly_advance', 'emergency_loan'
        },
        requestedWeeks: {
            type: "int",
            nullable: true, // For weekly salary advances
        },
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: { name: "employeeId" },
        },
        approver: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "approvedBy" },
            nullable: true,
        },
    },
});

export default Loan;
