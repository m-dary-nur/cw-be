const { gql } = require('apollo-server-core');

const scalarDef = gql`
  scalar ID
  scalar Bigint
  scalar Date
  scalar Time
  scalar Datetime
  scalar Decimal
`;

module.exports = scalarDef;
