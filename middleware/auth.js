const jwt = require('jsonwebtoken');
const user = require('../model/User')

exports.protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'

        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        user = await user.findById(decoded.id)

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'No user found with this id'

            })
        }
        req.user = user
        next()

    }
    catch {

        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        })
    }


}