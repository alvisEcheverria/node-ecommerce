const jwt = require('jsonwebtoken');
require('dotenv').config();

const dataToken = (bearerToken) =>{
    const token = bearerToken.split('Bearer ')[1];
    const decoded = jwt.verify(token, process.env.SECRET, 'HS512')
    return decoded;
}

module.exports = dataToken;