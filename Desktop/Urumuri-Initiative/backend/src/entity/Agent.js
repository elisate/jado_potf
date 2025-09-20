// agent.js
import { EntitySchema } from 'typeorm';

const Agent = new EntitySchema({
  name: 'Agent',
  tableName: 'agent',
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
    },
    phoneNumber: {
      type: 'varchar',
    },
    branch: {
      type: 'enum',
      enum: [
  'Gasabo-Kacyiru',
  'Gasabo-Kimironko',
  'Gasabo-Gisozi',
  'Kicukiro-Kagarama',
  'Kicukiro-Kanombe',
  'Kicukiro-Niboye',
  'Nyarugenge-Nyamirambo',
  'Nyarugenge-Kiyovu',
  'Nyarugenge-Muhima',
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
unique: true,
nullable: true,
    },
    agentCode: {
      type: 'varchar',
      nullable: true,
      unique: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },

    activities: {
      type: 'jsonb',
      default: [],
      nullable: true,
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
      joinColumn: true,
      inverseSide: 'agentProfile',
      eager: true,
      cascade: false,
    },
  },
});

export default Agent;
