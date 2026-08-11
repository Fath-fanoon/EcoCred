const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.get('/:userId', tokenController.getTokenBalance);
router.post('/reward', tokenController.rewardTokens);

module.exports = router; 