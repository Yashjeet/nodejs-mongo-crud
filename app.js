var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./src/db/repository');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const UserRoutes = require('./src/users/user-routes')
app.use('/users', UserRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(404);
});

// error handler
app.use(function (err, req, res, next) {
    if (err & err.name === 'ValidationError') {
        res.status(400)
        messages = []
        Object.keys(err.errors).forEach((fieldName) => {
            console.log(fieldName)
            messages.push(err.errors[fieldName].message)
        });
        res.send({
            status: false,
            message: messages
        })
    }
    else if (err & err === 404) {
        res.status(404)
        res.send({
            status: false,
            message: "Resource Not Found!"
        })
    }
    else {
        res.status(501)
        res.send({
            status: false,
            message: "Something went wrong!"
        })
    }
});

http.createServer(app).listen(3000, () => {
    console.log('server listening to 3000')
})

module.exports = app;
