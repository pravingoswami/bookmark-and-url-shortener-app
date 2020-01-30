const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect("mongodb://localhost:27017/bookmark-and-url-shortner-app", { useNewUrlParser: true, useUnifiedTopology: true })

        .then(() => {
            console.log("Connected to database")
        })

        .catch(err => console.log(err))
}

module.exports = setupDB