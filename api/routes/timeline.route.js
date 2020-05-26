const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const timelineCtrl = require('../controllers/timeline.controller');

router.use(jwt.checkJWT)
router.get('/', timelineCtrl.getTimeLine);

module.exports = router;
