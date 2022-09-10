const mariadb = require('mariadb');

require('dotenv').config();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

module.exports = pool;