const { Router } = require('express');

const userRouter = require('./user.route');
const carrierRouter = require('./carrier.route');

const router = Router();

router.use('/user', userRouter);
router.use('/carrier', carrierRouter);

module.exports = router;
