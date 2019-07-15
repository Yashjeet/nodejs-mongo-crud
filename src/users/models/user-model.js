const Mongoose = require('mongoose');

var Schema = Mongoose.Schema

const isMobileNumber = mobileNumber => mobileNumber.toString().length === 10;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    mobile: { type: Number, unique: true, index: true, validate: [isMobileNumber, 'Mobile Number is incorrect'] }
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
}

const UserModel = Mongoose.model("user", userSchema);

module.exports = UserModel;