import { EntitySchema } from 'typeorm';
import User from './userEntity.js';  // Note the .js extension needed in ES modules

const Token = new EntitySchema({
  name: 'Token',
  tableName: 'token',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    token: {
      type: 'varchar',
      unique: true,
    },
    expirationDate: {
      type: 'timestamp',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      inverseSide: 'tokens',
      onDelete: 'CASCADE',
    },
  },
});

export default Token;
