const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        console.log(token)


        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'you must be logged in'
            })
        }

        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        // if (decoded) {
        //     console.log(' decoded', decoded)
        // }

        // req.user = decoded
        // next()

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












    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
