const pool =  require('../configs/db');

const executeSqlQuery = async ({ query, values }) => {
	let conn;
	try {
		conn = await pool.getConnection();
		const results = await conn.query(query, values);
		await conn.release();
		return results;
	} catch (error) {
		return { error };
	} finally {
		if (conn) conn.release();
	}
};

module.exports = {
	executeSqlQuery
}