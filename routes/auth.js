const {Router} = require('express')
const router = new Router()
const User = require('../models/user')

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    isLogin: true,
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  req.session.user = await User.findById('62825fc4043f1d0e8d897db0')
  req.session.isAuthenticated = true
  req.session.save(err => {
    if (err) {
      throw err
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router