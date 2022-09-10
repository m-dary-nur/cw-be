const rootResolver = require('./root.resolver');
const authResolver = require('./auth.resolver');
const carrierResolver = require('./carrier.resolver');
const userResolver = require('./user.resolver');
const tripResolver = require('./trip.resolver');

module.exports = {
	rootResolver,
	authResolver,
	carrierResolver,
	userResolver,
	tripResolver,
};