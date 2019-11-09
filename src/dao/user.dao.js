const BaseDao = require("./base.dao");
const UserModel = require("../models/users.model");

const userDao = new BaseDao(UserModel);

async function createUser(data) {
    let query = { provider: data.provider, email: data.email }
    let options = {new: true, upsert: true, runValidators: true };
    const userData = await userDao.findOneAndUpdate(query, data, options).exec();
    return userData;
}

async function getUserData(query){
    const projection = {};
    const userData = await userDao.findOne(query, projection).lean().exec();
    return userData;
}

module.exports = {
    createUser,
    getUserData
};