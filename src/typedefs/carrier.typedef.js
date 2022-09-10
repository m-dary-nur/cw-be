const { gql } = require('apollo-server-core');

const carrierDef = gql`
	type Carrier {
		id: ID
		email: String
		password: String
		firstname: String
		lastname: String
		birthdate: Date
    gender: String
    phone: String
    verified: Boolean
    tripPrice: Decimal
    volumePrice: Decimal
    createdAt: Datetime
	}

	type Query {
		getCarriers: [Carrier]
		getCarrier: Carrier
	}
`;

module.exports = carrierDef;
