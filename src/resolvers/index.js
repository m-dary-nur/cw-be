const rootResolver = require('./root.resolver');
const carrierResolver = require('./carrier.resolver');
const userResolver = require('./user.resolver');
const tripResolver = require('./trip.resolver');

module.exports = {
	carrierResolver,
	userResolver,
	tripResolver,
};