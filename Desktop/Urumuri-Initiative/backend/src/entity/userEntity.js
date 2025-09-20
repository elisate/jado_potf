// userEntity.js
import { EntitySchema } from 'typeorm';
import Token from './Token.js';
import Agent from './Agent.js';
import Organization from './Organization.js';

export const UserRole = {
  ADMIN: 'admin',
  AGENT: 'agent',
  ORGANIZATION: 'organization',
};

const User = new EntitySchema({
  name: 'User',
  tableName: 'user',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    role: {
      type: 'enum',
      enum: Object.values(UserRole),
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    tokens: {
      type: 'one-to-many',
      target: 'Token',
      inverseSide: 'user',
      cascade: true,
    },
    agentProfile: {
      type: 'one-to-one',
      target: 'Agent',
      inverseSide: 'user',
      cascade: true,
      joinColumn: true,
    },
    organizationProfile: {
      type: 'one-to-one',
      target: 'Organization',
      inverseSide: 'user',
      joinColumn: true,
    },
  },
});

export default User;
