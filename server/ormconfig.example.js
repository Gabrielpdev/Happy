module.exports = {
  type: "postgres",
  host: processes.ENV.DB_HOST,
  port: processes.ENV.DB_PORT,
  username: processes.ENV.DB_USER,
  password: processes.ENV.DB_PASS,
  database: processes.ENV.DB_DATABASE,
  migrations: [processes.ENV.TYPEORM_MIGRATIONS],
  entities: [processes.ENV.TYPEORM_ENTITIES],
  cli: {
    migrationsDir: processes.ENV.TYPEORM_MIGRATIONS_DIR
  },
  seeds: [processes.ENV.TYPEORM_SEEDS],
  factories: [processes.ENV.TYPEORM_FACTORIES]
}
