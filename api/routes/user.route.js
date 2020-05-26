const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const userCtrl = require('../controllers/user.controller');


// router.post('/', userCtrl.postUser);

router.use( jwt.checkJWT );

router.get('/', userCtrl.getUser);

router.get('/:id', userCtrl.getUserById);

router.post('/follow', userCtrl.getFollows);

router.post('/inquiry', userCtrl.postInquiry);

router.put('/email', userCtrl.putEmail);

router.put('/notification', userCtrl.putNotification);

router.put('/checkpoketime', userCtrl.putCheckPokeTime);

module.exports = router;
