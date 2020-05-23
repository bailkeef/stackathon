const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(
  'AC06f15fd6084ca5770dcf3eeea350159a',
  'ad0d92f6921d5170a72b186985ddac77'
)

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
