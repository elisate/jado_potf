import { EntitySchema } from "typeorm";

const RNRSAccount = new EntitySchema({
  name: "RNRSAccount",
  tableName: "rnrs_accounts",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    accountName: {
      type: "varchar",
      length: 100,
    },
    accountNumber: {
      type: "varchar",
      length: 50,
      unique: true,
    },
    bankName: {
      type: "varchar",
      length: 100,
    },
    balance: {
      type: "decimal",
      precision: 15,
      scale: 2,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
    accountType: {
      type: "varchar",
      length: 50, // 'main', 'savings', 'rssb'
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
});

export default RNRSAccount;
