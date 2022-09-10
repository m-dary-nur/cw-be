const jwt = require('jsonwebtoken');

const { executeSqlQuery } = require('../../utils/query');
const { camelCaseKeys } = require('../../utils/case');

const authResolvers = {
	Query: {
		menuGetAll: async (_, __, { user }) => {
			try {
				const [data] = await executeSqlQuery({
					query: `CALL getMenuByClientId(?)`,
					values: [user.client],
				});
				return data.map(camelCaseKeys);
			} catch (error) {
				throw error;
			}
		},
	},
	Mutation: {
		signIn: async (_, { email, password, authType }) => {
			const jwtKey = process.env.JWT_SECRET;
			try {
				const [foundAccount] = await executeSqlQuery({
					query: 'SELECT * FROM carrier WHERE email = ? AND password = ?',
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

					const [result] = await executeSqlQuery({
						query: 'CALL sign_in(?, ?, ?, ?)',
						values: [email, password, token, authType],
					});

					if (result.message === 'ok') {
						return {
							session_token: token,
						};
					}

					return {
						session_token: null,
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
