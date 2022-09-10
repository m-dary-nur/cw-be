const { gql } = require('apollo-server-core');

const authDef = gql`
	type SignInResult {
		session_token: String
	}

	type SignOutResult {
		status: String!
	}

	type Mutation {
		signIn(email: String!, password: String!, authType: String!): SignInResult
		signOut: SignOutResult
	}
`;

module.exports = authDef;
