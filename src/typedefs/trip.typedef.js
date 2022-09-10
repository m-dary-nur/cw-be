const { gql } = require('apollo-server-core');

const tripDef = gql`
	type Trip {
		id: ID
		carrierId: Bigint
		userId: Bigint
		pickupAddress: String
		destinationAddress: String
		stopoverAddresses: [String]
		date: Date
		time: Time
    carrierTripPrice: Decimal
    carrierVolumePrice: Decimal
    userTrip: Decimal
    userVolume: Decimal
    finalTripPrice: Decimal
    finalVolumePrice: Decimal
	}

	type Query {
		getTrips: [Trip]
		getTrip(id: ID!): Trip
	}
`;

module.exports = tripDef;
