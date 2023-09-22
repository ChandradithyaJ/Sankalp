//config file for all the database connection details as well as the secret for the JWT
const Access_token_secret = 'yoursecret';
const salt = 10;
const jwt_expire_time = 3600;
//for now db is a json file
const db = require('../model/users.json');
module.exports = {
    Access_token_secret,
    jwt_expire_time,
    salt,
    db
}