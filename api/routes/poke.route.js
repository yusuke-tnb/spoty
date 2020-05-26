const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const pokeCtrl = require('../controllers/poke.controller');


router.use( jwt.checkJWT );
router.get('/', pokeCtrl.getPoke);

router.get('/show', pokeCtrl.showUser);

router.post('/', pokeCtrl.postPoke);

module.exports = router;
