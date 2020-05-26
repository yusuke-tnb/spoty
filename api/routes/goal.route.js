const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const goalCtrl = require('../controllers/goal.controller');


router.get('/', goalCtrl.getGoals);

router.get('/:id', goalCtrl.getGoalById);

router.use( jwt.checkJWT );
router.post('/', goalCtrl.postGoal);

module.exports = router;
