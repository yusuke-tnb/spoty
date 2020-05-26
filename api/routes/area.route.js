const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const areaCtrl = require('../controllers/area.controller');

router.get('/',　areaCtrl.getAreas);

router.get('/:id', areaCtrl.getAreaById);

router.use( jwt.checkJWT );
router.post('/', areaCtrl.postArea);

module.exports = router;
