const { Sequelize } = require('sequelize');

const pg = require('pg');
pg.defaults.ssl = { rejectUnauthorized: false };

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

module.exports = sequelize;
