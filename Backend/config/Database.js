const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(MONGODB_URL)
    .then(console.log("DB Connected"))
    .catch(console.log("Error in DB Connection"));
}

module.exports = dbConnect;