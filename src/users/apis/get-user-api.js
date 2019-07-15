const UserModel = require('../models/user-model');
const logger = require('../../lib/logger');
const fetchResult = require('../../lib/fetch-result');

const get = async (req, res, next) => {

    logger.info('Request to get users');
    let [error, result] = await fetchResult(UserModel.find());

    if (error) {
        next(error);
    }
    else {
        let json = result.map(function (p) {
            return p.toJSON()
        });
        res.send({
            status: true,
            entity: json,
            message: 'successfully get user!'
        })
    }
}
module.exports.get = get