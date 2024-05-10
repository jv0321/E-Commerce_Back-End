const User = require('./User')
const Post = require('./Post')
const Comment = require('./Category')

Post.belongsTo(User, { foreignKey: "user_id" })
Post.hasMany(Comment)

User.hasMany(Post, { foreignKey: "user_id "})
User.hasMany(Comment, { foreignKey: "user_id "})

Comment.belongsTo(Post)
Comment.belongsTo(User, { foreignKey: "user_id "})

module.exports = {
  User: User,
  Post: Post,
  Comment: Comment
}