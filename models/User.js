const { DataTypes, Model } = require('sequelize');
const client = require('../db/client')
const { hash, compare } = require('bcrypt')

class User extends Model {
  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, this.password)

    return is_valid
  }

  toJSON() {
    const user = Object.assign({}, this.get())

    delete user.password

    return user
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    //   validate: {
    //     len: 6
    //   },
      allowNull: false
    }
  },
  {
    sequelize: client,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10)
      }
    },
    timestamps: false
  }
)

module.exports = User