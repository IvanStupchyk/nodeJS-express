const express = require('express')
const session = require('express-session')
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
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('62825fc4043f1d0e8d897db0')

    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
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
    const URL = 'mongodb+srv://ivanStupchyk:7915465@cluster0.yrnll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    await mongoose.connect(URL, {
      useNewUrlParser: true,
    })

    const candidate = await User.findOne()

    if (!candidate) {
      const user = new User({
        email: 'valyastupchuk@gmail.com',
        name: 'Ivan',
        card: {
          items: []
        }
      })

      await user.save()
    }

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