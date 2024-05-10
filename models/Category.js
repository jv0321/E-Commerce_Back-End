const { Model, DataTypes } = require('sequelize')
const client = require('../db/client')

class Comment extends Model { }

Comment.init(
    {
       text: {
            type: DataTypes.STRING,
            allowNull: false
          }
    },
    {
        sequelize: client
    }
)

module.exports = Comment