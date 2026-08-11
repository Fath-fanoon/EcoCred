const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.post('/', actionController.submitAction);
router.get('/:userId', actionController.getActionsByUser);

module.exports = router; 