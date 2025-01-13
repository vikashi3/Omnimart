const express = require('express');
const router = express.Router();
const businessCardController = require('../controllers/businessCardController');

router.post('/add', businessCardController.createBusinessCard);
router.get('/:userId', businessCardController.getBusinessCardsByUser);

module.exports = router;
