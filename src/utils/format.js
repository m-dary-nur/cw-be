const { camelCase, mapKeys } = require('lodash');

const camelCaseKeys = (obj) => {
	return mapKeys(obj, (_, k) => camelCase(k));
};

module.exports = {
	camelCaseKeys
}
