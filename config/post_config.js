const { Post, User } = require('../models')

module.exports = {
    async registerUser(req, res) {
        try {
            const { username, password } = req.body

            const newUser = await User.create(({
                username,
                password,

            }))

            req.session.user_id = newUser.user_id
            res.redirect('/')
        } catch (err) {
            console.log(err)

            res.redirect('/register')
        }
    },

    async loginUser(req, res) {
        const { username, password } = req.body


        try {
            const user = await User.findOne({ where: { username } })

            if (!user || !user.validatePass(password)) {
                return res.status(401).json({ error: 'Invalid username or password' })
            }
            req.session.user_id = user.user_id

            res.redirect('/')

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' })
        }
    },

    async dashboardPost(req, res) {
        try {
            const { title, text } = req.body
            console.log(req.body)
            
            const newPost = await Post.create({
                title,
                text,
                user_id: req.session.user_id
            })


            req.session.user_id = newPost.user_id
            res.redirect('/')
        } catch (err) {
            console.log(err)

            const errors = err.errors.map(eObj => {
                return {
                    message: eObj.message
                }
            })

            res.status(403).json({
                message: 'Validation Error',
                errors: errors
            })
        }
    },

    async updatePost(req, res) {
        try {
            const { postId } = req.params;
            const { title, text } = req.body;
    
            const updatedPost = await Post.findByPk(postId);
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' })
            }
    
            updatedPost.title = title
            updatedPost.text = text
            await updatedPost.save()
    
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' })
        }
    },

    async deletePost(req, res) {
        try {
          const { postId } = req.params;

          const post = await Post.findByPk(postId);
      
          if (!post) {
              return res.status(404).json({ error: 'Post not found' });
          }

          await post.destroy()
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
      }
}