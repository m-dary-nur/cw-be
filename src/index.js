const express = require('express');

const v1 = require('./routes/v1/index.route');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.json('server works!', 200);
});

app.use('/v1', v1);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
