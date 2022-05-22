
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}