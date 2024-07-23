import pg from "pg"

export let client
export const db = () => {
  const sslConfig =
    process.env.ENVIRONMENT === "production"
      ? true // { ca: process.env.POSTGRES_SSL_BASE64_CERTIFICATE }
      : false

  client = new pg.Client({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    ssl: sslConfig,
  })
  client.connect()
}
