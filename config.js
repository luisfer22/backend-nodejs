require('dotenv').config()


module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  },
  // microservice port
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001
  },
  post: {
    port: process.env.POST_PORT || 3002
  }
}