const keys = require('../keys')

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Password recovery',
    html: `
      <h1>Did you forget your password?</h1>
      <p>If no than ignore this mail</p>
      <p>Else click on the button link:</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Recovery access</a></p>
      <hr />
      <a href="${keys.BASE_URL}">Courses shop</a>
    `
  }
}
