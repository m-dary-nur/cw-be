const jwt = require('jsonwebtoken');

const { executeSqlQuery } = require('../utils/query');

const authResolvers = {
	Mutation: {
		signIn: async (_, { email, password, authType }) => {
			const jwtKey = process.env.JWT_SECRET;
			try {
				const [foundAccount] = await executeSqlQuery({
					query: `SELECT * FROM ${authType} WHERE email = ? AND password = ?`,
					values: [email, password],
				});

				if (foundAccount) {
					const token = jwt.sign(
						{
							id: foundAccount.id,
							authType,
						},
						jwtKey,
						{
							algorithm: 'HS256',
							expiresIn: '1d',
						}
					);

					const [[result]] = await executeSqlQuery({
						query: 'CALL sign_in(?, ?, ?, ?)',
						values: [email, password, token, authType],
					});

					return {
						session_token: result.session_token,
					};
				}

				return null;
			} catch (error) {
				throw error;
			}
		},
		signOut: async (_, __, { id, authType }) => {
			try {
				const [result] = await executeSqlQuery({
					query: 'CALL signOut(?, ?, ?)',
					values: [id, user.token, authType],
				});

				return {
					status: result,
				};
			} catch (error) {
				throw error;
			}
		},
	},
};

module.exports = authResolvers;
