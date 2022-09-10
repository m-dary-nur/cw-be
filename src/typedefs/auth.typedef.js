const { gql } = require('apollo-server-core');

const authDef = gql`
   type SessionCarrier {
    email: String
		firstname: String
		lasstname: String
		birthdate: Date
		gender: String
		phone: String
    verified: Boolean
    tripPrice: Decimal
    volumePrice: Decimal
  }

	type SessionUser {
		email: String
		firstname: String
		lasstname: String
		birthdate: Date
		gender: String
		phone: String
    verified: Boolean
	}

  type SignInResult {
    session_token: String
  }

  type SignOutResult {
    status: String!
  }

  type Query {
    getCarrier: SessionCarrier!
    getUser: SessionUser!
  }

	type Mutation {
		signIn(email: String!, password: String!, authType: String!): SignInResult!
		signOut: SignOutResult!
	}
`;

module.exports = authDef;
