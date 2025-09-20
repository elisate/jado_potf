// Employee.js
import { EntitySchema } from 'typeorm';

export const BankType = {
  BK: 'bk',
  EQUITY: 'equity',
  ACCESS: 'access',
  OTHER: 'other',
};

const Employee = new EntitySchema({
  name: 'Employee',
  tableName: 'employee',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    employeeStatus: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    phone: {
      type: 'varchar',
    },
    salary: {
      type: 'decimal',
    },
    bankType: {
      type: 'enum',
      enum: BankType,
    },
    approved: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  relations: {
    organization: {
      type: 'many-to-one',
      target: 'Organization',
      inverseSide: 'employees',
      onDelete: 'CASCADE',
      nullable: false,
    },
  },
});

export default Employee;
