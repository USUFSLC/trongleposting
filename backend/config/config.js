module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'dockerposting_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  }
};
