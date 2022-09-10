// const { withFilter } = require('graphql-subscriptions');

const { executeSqlQuery } = require('../utils/query');
const { camelCaseKeys } = require('../utils/format');
// const { pubsub } = require('../configs/pubsub');

const userResolver = {
	Query: {
		getUsers: async () => {
			try {
				const data = await executeSqlQuery({
					query: `SELECT * FROM user ORDER BY firstname, lastname ASC`,
				});
				return data.map(camelCaseKeys);
			} catch (error) {
				throw error;
			}
		},
	},
	// Subscription: {
	// 	userOnChanged: {
	// 		subscribe: withFilter(
	// 			() => pubsub.asyncIterator('userOnChanged'),
	// 			(payload, _, { user }) =>
	// 				parseInt(payload.rackOnChanged.clientId, 10) ===
	// 				parseInt(user.client, 10)
	// 		),
	// 	},
	// },
};

module.exports = userResolver;
