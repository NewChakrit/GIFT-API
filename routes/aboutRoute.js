const express = require('express');
const passport = require('passport');

const router = express.Router();
const aboutController = require('../controllers/aboutController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/:id', auth, aboutController.getAboutById);
router.post('/:id', aboutController.createAbout);
router.put('/:id', auth, aboutController.updateAbout);
router.put('/location/:id', auth, aboutController.updateLocation);

module.exports = router;
