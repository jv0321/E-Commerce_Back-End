const router = require('express').Router()
const post_controller = require('../controllers/post_controller')



//Register user
router.post('/register', post_controller.registerUser)

//Login a User
router.post('/login', post_controller.loginUser)

//Load users post
router.post('/dashboard', post_controller.dashboardPost)

//Update post
router.post('/update/:postId', post_controller.updatePost);

//Delete Post
router.post('/delete/:postId', post_controller.deletePost);

module.exports = router