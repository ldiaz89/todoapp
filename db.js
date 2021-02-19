const Pool = require('pg').Pool
require('dotenv').config();

console.log(process.env.PG_USER, process.env.PG_HOST )
const devCongif={

    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT,
    database:process.env.PG_DATABASE

}


const pool = new Pool(devCongif);

module.exports = pool;