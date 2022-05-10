const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const { Router } = require('express')
const router = new Router()

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/', async (req, res) => {
  res.render('index')
})

app.get('/about', async (req, res) => {
  res.render('about')
})

module.exports = router


const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`)
})