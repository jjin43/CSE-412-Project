require("dotenv").config();
var pgp = require("pg-promise")();
var db = pgp(process.env.DB_CONNSTR);

module.exports = { pgp, db };
