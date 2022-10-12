const express = require('express');
const { getPrivateData } = require('../controllers/privateRoute');
const { protect } = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.route('/').get(verifyToken, getPrivateData)

module.exports = router;