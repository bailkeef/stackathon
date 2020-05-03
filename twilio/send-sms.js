const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

function sendText(phoneNumber, message) {
  console.log('im in here now')

  client.messages
    .create({
      to: phoneNumber,
      from: '+19382010553',
      body: message
    })
    .then(message => console.log(message.sid))
}

module.exports = {
  sendText
}
