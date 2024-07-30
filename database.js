const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTIONLIMIT,
    acquireTimeout: process.env.DB_ACQUIRETIMEOUT,
})

module.exports= pool;
