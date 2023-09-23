// config file for all the database connection details as well as the secret for the JWT
const salt = 10;
const jwt_expire_time = 3600;

const db = require('../model/users.json');

module.exports = {
    jwt_expire_time,
    salt,
    db
}