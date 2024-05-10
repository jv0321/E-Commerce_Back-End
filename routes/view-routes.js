const router = require('express').Router()

const view_controller = require('../controllers/view_controller')


// Show register page
router.get('/register', view_controller.showRegisterPage)


//Show login page
router.get('/login', view_controller.showLoginPage)

// Show dashboard
router.get('/dashboard', view_controller.showDashboardPage)


//Show home page
router.get('/', view_controller.showHomePage)

// Render update page with post data
router.get('/update/:postId', view_controller.showUpdatePage)


// Logout route to destroy session
router.get('/logout', view_controller.showLogoutPage)


module.exports = router