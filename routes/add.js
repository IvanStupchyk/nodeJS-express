const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
  res.render('add', {
    title: 'Add Course',
    isAdd: true
  })
})

module.exports = router