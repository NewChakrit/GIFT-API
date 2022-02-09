const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/', uploadController.uploadImage);
// router.post('/post', uploadController.uploadImagePost);

module.exports = router;
