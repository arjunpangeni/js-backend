


const JWT = require('jsonwebtoken')

const secret = "chapakot123$$"

function createTokenForUser(user) {
    const payload = {
        _id: user.id,
        name: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    };

    const token = JWT.sign(payload, secret)
    return token

}

function validateToken(token) {
    try {
        // Verify and return the decoded token payload
        const payload = JWT.verify(token, secret)
        return payload
    } catch (error) {
        // Handle token verification error (e.g., invalid or expired token)
        throw new Error("Invalid or expired token")
    }
}


module.exports = { createTokenForUser, validateToken }