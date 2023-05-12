const mongoose = require("mongoose")
require('dotenv').config()
const connection = () => mongoose.connect("mongodb+srv://uma:uma@cluster0.g3tcjlo.mongodb.net/ghostFashion?retryWrites=true&w=majority")
module.exports = {
    connection
}