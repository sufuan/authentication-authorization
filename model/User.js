const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    // next();


    // ---------------- onother option to save user -------------------
    const hashpassword = await bcrypt.hash(this.password, 10);
    this.password = hashpassword;
    next();
    //--------------------------------------------------------
});





// =====================login area ================

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}








const User = mongoose.model("User", UserSchema);

module.exports = User;