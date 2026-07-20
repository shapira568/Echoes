const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to connect to PostgreSQL.');
}

const isLocalDb =
  databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: isLocalDb
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 3,
    match: [/Connection terminated unexpectedly/i, /ConnectionError/i]
  }
});

module.exports = sequelize;
