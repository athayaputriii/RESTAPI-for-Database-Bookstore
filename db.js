const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "TBDTask",
    password: "782219",
    port: 5432,
});

module.exports = pool;