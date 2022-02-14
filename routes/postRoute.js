const express = require('express');
const passport = require('passport');

const router = express.Router();
const postController = require('../controllers/postController');
const auth = passport.authenticate('jwt-auth', { session: false });

router.get('/:username', auth, postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/like/:id', auth, postController.likePost);
router.delete('/like/:id', auth, postController.unLikePost);

module.exports = router;
