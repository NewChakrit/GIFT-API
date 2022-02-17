const express = require('express');
const passport = require('passport');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/room', auth, chatController.getAllChat);
router.get('/message/:id', auth, chatController.getMessage);

module.exports = router;
