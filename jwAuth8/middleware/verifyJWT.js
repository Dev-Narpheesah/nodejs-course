// const jwt = require('jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Your verification code here



const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.sendStatu(401)
        console.log(authHeader) // bearer token
    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403)
            req.user = decoded.username
            next()
        }
    )
}

module.exports = verifyJWT;