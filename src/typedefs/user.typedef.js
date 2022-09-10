const { gql } = require('apollo-server-core');

const userDef = gql`
	type User {
		id: ID
		email: String
		password: String
		firstname: String
		lastname: String
		birthdate: Date
    gender: String
    phone: String
    verified: Boolean
    createdAt: Datetime
	}

	type Query {
		getUsers: [User]
		getUser: User
	}
`;

module.exports = userDef;
