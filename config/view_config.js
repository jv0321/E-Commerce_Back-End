const { Post, User } = require('../models')

module.exports = {

    showRegisterPage(req, res) {
        res.render('register')
    },
    showLoginPage(req, res) {
        res.render('login')
    },

    async showDashboardPage(req, res) {
        
        try {

            if (!req.session.user_id) {
                return res.redirect('/login')
            }
            
            const posts = await Post.findAll({
                where: {
                    user_id: req.session.user_id
                },
                include: User
            })

            const currentUser = req.session.user_id ? true : false
            
            
            res.render('dashboard', {
                posts: posts.map(eobj => eobj.get({ plain: true })),
                user: currentUser
            })

        } catch (error) {
            console.error('Error fetching events:', error)
            res.status(500).send('Internal Server Error')
        }
    },

    async showHomePage(req, res) {
        try {
            const posts = await Post.findAll({
                include: User
            })
            console.log(posts)
            const currentUser = req.session.user_id ? true : false

            res.render('home', {
                posts: posts.map(eobj => eobj.get({ plain: true })),
                user: currentUser
            })

        } catch (error) {
            console.error('Error fetching events:', error)
            res.status(500).send('Internal Server Error')
        }
    },

    async showUpdatePage(req, res) {
        try {
            const { postId } = req.params

            const post = await Post.findByPk(postId)

            if (!post) {
                return res.status(404).send('Post not found')
            }

            res.render('update', { postId: postId, title: post.title, text: post.text })
        } catch (err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
        }
    },

    showLogoutPage(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err)
                res.sendStatus(500)
            } else {
                res.redirect('/login')
            }
        })
    },
}