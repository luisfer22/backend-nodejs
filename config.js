module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecretv2!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'toor,+13::Q',
    database: process.env.MYSQL_DB || 'test_node'
  },
  // microservice port
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001
  }
}