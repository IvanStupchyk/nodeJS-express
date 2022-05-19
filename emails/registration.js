const keys = require('../keys')

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Account was created',
    html: `
      <h1>Welcome to our shop</h1>
      <p>Account was successful created with email - ${email}</p>
      <hr />
      <a href="${keys.BASE_URL}">Courses shop</a>
    `
  }
}