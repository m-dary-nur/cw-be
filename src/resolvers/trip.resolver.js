// const { withFilter } = require('graphql-subscriptions');

const { executeSqlQuery } = require('../utils/query');
const { camelCaseKeys } = require('../utils/format');
// const { pubsub } = require('../configs/pubsub');

const tripResolver = {
	Query: {
		getTrips: async () => {
			try {
				const data = await executeSqlQuery({
					query: `SELECT * FROM trip ORDER BY date, time ASC`,
				});
				return data.map((single) => ({
					...single,
					stopoverAddresses: JSON.parse(single.stopoverAddresses),
				}));
			} catch (error) {
				throw error;
			}
		},
		getTrip: async (_, { id }) => {
			try {
				const [data] = await executeSqlQuery({
					query: `SELECT * 
                  FROM trip
                  WHERE id = ?`,
					values: [id, session],
				});
				return camelCaseKeys({
					...data,
					stopoverAddresses: JSON.parse(data.stopoverAddresses),
				});
			} catch (error) {
				throw error;
			}
		},
	},
	// Subscription: {
	// 	tripOnChanged: {
	// 		subscribe: withFilter(
	// 			() => pubsub.asyncIterator('tripOnChanged'),
	// 			(payload, _, { user }) =>
	// 				parseInt(payload.tripOnChanged.clientId, 10) ===
	// 				parseInt(user.client, 10)
	// 		),
	// 	},
	// },
};

module.exports = tripResolver;
