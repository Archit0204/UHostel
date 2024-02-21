const mongoose = require('mongoose');
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB Connected"))
    .catch((err) => {
        console.error(err);
        console.log("DB connextion issues");
        process.exit(1);
    });
}