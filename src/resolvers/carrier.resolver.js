// const { withFilter } = require('graphql-subscriptions');

const { executeSqlQuery } = require('../utils/query');
const { camelCaseKeys } = require('../utils/format');
// const { pubsub } = require('../configs/pubsub');

const carrierResolver = {
	Query: {
		getCarriers: async () => {
			try {
				const data = await executeSqlQuery({
					query: `SELECT * FROM carrier ORDER BY firstname, lastname ASC`,
				});
				return data.map(camelCaseKeys);
			} catch (error) {
				throw error;
			}
		},
	},
	// Subscription: {
	// 	carrierOnChanged: {
	// 		subscribe: withFilter(
	// 			() => pubsub.asyncIterator('carrierOnChanged'),
	// 			(payload, _, { session }) =>
	// 				parseInt(payload.carrierOnChanged.id, 10) === parseInt(session.id, 10)
	// 		),
	// 	},
	// },
};

module.exports = carrierResolver;
