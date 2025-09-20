// organization.js
import { EntitySchema } from 'typeorm';
import User from './userEntity.js';
import Employee from './Employee.js';

const Organization = new EntitySchema({
  name: 'Organization',
  tableName: 'organization',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    fullName: {
      type: 'varchar',
    },
  location: {
  type: 'enum',
  enum: [
    'Gasabo-Kimironko',
    'Gasabo-Kacyiru',
    'Gasabo-Gisozi',
    'Nyarugenge-Nyamirambo',
    'Nyarugenge-Kiyovu',
    'Nyarugenge-Muhima',
    'Kicukiro-Kagarama',
    'Kicukiro-Kanombe',
    'Kicukiro-Niboye',
    'Bugesera',
    'Burera',
    'Gakenke',
  'Gatsibo',
  'Gicumbi',
  'Gisagara',
  'Huye',
  'Kamonyi',
  'Karongi',
  'Kayonza',
  'Kirehe',
  'Muhanga',
  'Musanze',
  'Ngoma',
  'Ngororero',
  'Nyabihu',
  'Nyagatare',
  'Nyamagabe',
  'Nyamasheke',
  'Nyanza',
  'Nyaruguru',
  'Rubavu',
  'Ruhango',
  'Rulindo',
  'Rusizi',
  'Rutsiro',
  'Rwamagana'
  ],
  nullable: false
},

    email: {
      type: 'varchar',
      unique: true,
    },
    certificateUrl: {
  type: 'varchar',
  nullable: false, 
},
orgCode:{
  type: 'varchar',
  unique: true,
  nullable: true,
},
    approved: {
      type: 'boolean',
      default: false,
    },
    phone: {
      type: 'varchar',
    },
    agentCode: {
      type: 'varchar',
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    contract: {
      type: 'jsonb',
      default: [],
      nullable: true,
    },
    signedContract: {
      type: 'boolean',
      default: false,
    },
  },

  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
      cascade: true,
      joinColumn: true,
      eager: false,
    },
    employees: {
      type: 'one-to-many',
      target: 'Employee',
      inverseSide: 'organization',
      cascade: true,
      eager: false,
    },
  },
});

export default Organization;
