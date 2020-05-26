const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const spotCtrl = require('../controllers/spot.controller');


router.use( jwt.checkJWT );
router.get('/', spotCtrl.getSpot);

router.post('/', spotCtrl.postSpot);

module.exports = router;
