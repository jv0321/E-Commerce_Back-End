const express = require('express')

const { engine } = require('express-handlebars')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3333

const client = require('./db/client')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const post_routes = require('./routes/post_routes')
const view_routes = require('./routes/view_routes')

app.use(express.urlencoded({extended: false}))

// app.use(express.static('public'))

// app.use(express.static(path.join(__dirname, '/public')))

app.engine('.hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', '.hbs') 

// Setup sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: client,
    }),
  }))

  
app.use('/', [post_routes, view_routes])

client.sync({ force:false })
    .then(() => {
        app.listen(PORT, () => console.log('Server started on port', PORT))
    })