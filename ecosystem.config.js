const env_production = {
       NODE_ENV: "production"
    }
const env_development = {
       NODE_ENV: "development"
}
    
const globalConfPm2 = {
  max_restarts: 5,
  autorestart: true,
  ignore_watch: ['node_modules', 'logs'],
  error_file: './logs/errors.log'
}

module.exports = {
  apps: [
  {
    name   : "root",
    script: "./api/index.js",
    watch: true,
    env_production,
    env_development,
    ...globalConfPm2
  },
  {
    name   : "mysql-service",
    script : "./mysql/index.js",
    watch: true,
    env_production,
    env_development,
    ...globalConfPm2
  },
  {
    name   : "post-service",
    script : "./post/index.js",
    watch: true,
    error_file: "./logs/errors.log",
    env_production,
    env_development,
    ...globalConfPm2
  },
  ]
}
