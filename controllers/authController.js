const User = require("../model/User");
const bcrypt = require('bcryptjs')


exports.register = async (req, res) => {

    const { name, email, password } = req.body

    try {

        const ifUserExist = await User.findOne({ email })

        if (ifUserExist) {
            return res.status(400).json({ message: "User already exist" })
        }


        const user = await User.create({
            name,
            email,
            password
        });


        // ---------------- onother option to save user -------------------

        // const salt = await bcrypt.genSalt(10)
        // const hashpassword = await bcrypt.hash(password, salt)

        // const user = await User.create({
        //     name,
        //     email,
        //     password: hashpassword
        // });

        //--------------------------------------------------------





        res.status(200).json({
            success: true,
            data: user
        })

        // const token = user.getresetPasswordToken()




    } catch (error) {
        // res.status(400).json({
        //     success: false,
        //     message: error.message
        // })

        console.log(error.message)
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(404).json({
            success: false,
            message: "please provide email and password"
        })
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const isMatch = await user.matchPasswords(password)

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "invalid credentials"
            })
        }


        // const token = generateToken(user)


        res.status(200).json({
            success: true,
            token
        })


        // sendToken(user, 200, res)

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'no user found with this email'
            })
        }

        const resetToken = user.getresetPasswordToken()
        await user.save()

        const resetURl = `${req.protocol}://${req.get('host')}/passwordreset/${resetToken}`
        message = `
        <h1>you have requested a password reset</h1>
        <p>please go to this link to reset your password</p>
        <a href=${resetURl} clicktracking=off>${resetURl}</a>
        `

        try {

        } catch (error) {

        }


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




exports.resetPassword = async (req, res, next) => {
    try {
        res.send('resrt')
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


}


const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken()
    res.status(statusCode).json({
        success: true,
        token
    })
}