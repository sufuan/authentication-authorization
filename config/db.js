const mongoose = require("mongoose");


const ConnectDB = () => {

    mongoose
        .connect(process.env.DATABASE)
        .then(() => console.log("DB CONNECTED"))
        .catch((err) => console.log("DB CONNECTION ERR", err));


}

module.exports = ConnectDB

