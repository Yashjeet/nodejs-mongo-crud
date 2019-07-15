const mongoose = require('mongoose');
var url = "mongodb://mongo:27017/CompanyGram";

mongoose.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
});