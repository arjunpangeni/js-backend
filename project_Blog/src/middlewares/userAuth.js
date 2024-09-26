const { validateToken } = require("../services/auth")


function checkForAuthTokenCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]

        if (!tokenCookieValue) {
            return next()
        }
        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
            return next()
        } catch (error) {
            console.error('token validation failed', error)
            return next()
        }
    }
}

module.exports = {
    checkForAuthTokenCookie
}