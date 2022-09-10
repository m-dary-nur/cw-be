const { camelCase, mapKeys } = require('lodash');

const camelCaseKeys = (obj) => {
	// return Object.entries(obj).map(([v, k]) => ([
	// 	camelCase(k),
	// 	typeof date.getMonth === 'function' ? moment(v).format()
	// ]))

	return mapKeys(obj, (v, k) => {
		return camelCase(k);
	});
};

module.exports = {
	camelCaseKeys
}
