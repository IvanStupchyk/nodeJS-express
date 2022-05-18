const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const varMiddleware = require('./middleware/variables')

const MONGODB_URL = 'mongodb+srv://ivanStupchyk:7915465@cluster0.yrnll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URL
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(varMiddleware)


app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {


    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
    })

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()




const PASSWORD = 7915465;
const USER_NAME = 'ivanStupchyk';