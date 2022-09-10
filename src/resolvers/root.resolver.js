const { GraphQLScalarType, Kind } = require('graphql');
const Big = require('big.js');
const moment = require('moment');

BigInt.prototype['toJSON'] = function () {
	return this.toString();
};

const rootResolver = {
	ID: new GraphQLScalarType({
		name: 'ID',
		description: 'ID custom scalar type',
		parseValue(value) {
			return parseInt(value, 10);
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10);
			}
			return null;
		},
	}),
	Bigint: new GraphQLScalarType({
		name: 'Bigint',
		description: 'Bigint custom scalar type for references ID',
		parseValue(value) {
			return parseInt(value, 10);
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10);
			}
			return null;
		},
	}),
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return moment(value).format('YYYY-MM-DD');
		},
	}),
	Time: new GraphQLScalarType({
		name: 'Time',
		description: 'Time custom scalar type',
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return moment(value).format('HH:mm');
		},
	}),
	Datetime: new GraphQLScalarType({
		name: 'Datetime',
		description: 'Datetime custom scalar type',
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return moment(value).format('YYYY-MM-DD HH:mm');
		},
	}),
	Decimal: new GraphQLScalarType({
		name: 'Decimal',
		description: 'Decimal custom scalar type for currency',
		parseValue(value) {
			return Big(value);
		},
		serialize(value) {
			return new Big(value);
		},
		parseLiteral(ast) {
			if (ast.kind !== Kind.STRING) {
				throw new TypeError(
					`${String(ast.value)} is not a valid decimal value.`
				);
			}

			return Big(ast.value);
		},
	}),
};

module.exports = rootResolver;
