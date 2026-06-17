const { Sequelize } = require('sequelize');

const isLocalDb =
  process.env.DATABASE_URL &&
  (process.env.DATABASE_URL.includes('localhost') ||
    process.env.DATABASE_URL.includes('127.0.0.1'));

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: isLocalDb
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
  logging: false
});

module.exports = sequelize;
