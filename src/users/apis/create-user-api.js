const UserModel = require('../models/user-model');
const logger = require('../../lib/logger');
const fetchResult = require('../../lib/fetch-result');

const post = async (req, res, next) => {
    const { firstName, lastName, mobile } = req.body;

    logger.info('Request to create user', { firstName, lastName, mobile });

    var user = new UserModel({
        firstName,
        lastName,
        mobile
    });

    let [error, result] = await fetchResult(user.save());
    if (error) {
        next(error);
    }
    else {
        res.send({
            status: true,
            entiy: result.toJSON(),
            message: 'successfully created user!'
        })
    }
}
module.exports.post = post