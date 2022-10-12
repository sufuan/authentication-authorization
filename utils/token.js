const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRESIN,
    });

    return token;
}