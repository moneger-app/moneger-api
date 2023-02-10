const { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function getVerifiedUserData(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    }).catch(err => { console.log(err) })
    return ticket.getPayload()
}

module.exports = getVerifiedUserData