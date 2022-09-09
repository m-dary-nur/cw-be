const { Router } = require('express');

const carrierController = require('../../controllers/carrier.controller');

const router = Router();

router.get('/', carrierController.get);

module.exports = router;