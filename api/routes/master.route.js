const express = require('express');
const router = express.Router();
const masterCtrl = require('../controllers/master.controller');

router.post('/', masterCtrl.master);

module.exports = router;
