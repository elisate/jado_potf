import { EntitySchema } from "typeorm";

export const PaymentStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
};

export const PaymentType = {
  SALARY: "salary",
  LOAN_DEDUCTION: "loan_deduction",
  SAVINGS: "savings",
  RSSB_INSURANCE: "rssb_insurance",
};

const Payment = new EntitySchema({
    name: "Payment",
    tableName: "payments",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        paymentReference: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        salaryCode: {
            type: "varchar",
            length: 50,
            unique: true,
        },
        grossSalary: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },
        loanDeduction: {
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
        },
        savingsDeduction: {
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
        },
        rssbDeduction: {
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
        },
        netSalary: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },
        status: {
            type: "enum",
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
        paymentType: {
            type: "enum",
            enum: Object.values(PaymentType),
            default: PaymentType.SALARY,
        },
        paymentDate: {
            type: "date",
        },
        paymentMonth: {
            type: "int",
        },
        paymentYear: {
            type: "int",
        },
        processedAt: {
            type: "timestamp",
            nullable: true,
        },
        transactionId: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        failureReason: {
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
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            joinColumn: { name: "employeeId" },
        },
    },
});

export default Payment;
