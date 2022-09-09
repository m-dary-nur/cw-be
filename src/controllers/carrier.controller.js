const get = async (req, res, next) => {
	try {
		const result = {
			message: 'carrywise carrier endpoint works!',
			status: 'ok',
		};

		res.status(200).json(result);
	} catch (err) {
		console.error(`Error while getting carrier`, err.message);
		next(err);
	}
};

module.exports = {
  get
}