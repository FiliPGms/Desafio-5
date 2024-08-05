const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "jjks",
    database: "turismo_maranhao",
    connectionLimit: 10,
    acquireTimeout: 30000,
    port: 3306,
})


module.exports= pool;