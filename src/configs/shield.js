const { rule, shield } = require('graphql-shield');

const isAuthenticated = rule()((_, __, ctx) => {
	const result = ctx.id && ctx.authType && ctx.id !== undefined && ctx.authType !== undefined;
	return result;
});

const graphqlPermissions = shield(
	{
		Query: {
			getCarriers: isAuthenticated,
			getCarrier: isAuthenticated,
			getUsers: isAuthenticated,
			getUser: isAuthenticated,
			getTrips: isAuthenticated,
			getTrip: isAuthenticated,
		},
		Mutation: {
			signOut: isAuthenticated,
		},
	},
	{
		allowExternalErrors: true,
		fallbackError: Error('Request Unauthorized.'),
	}
);

module.exports = {
	graphqlPermissions
}
