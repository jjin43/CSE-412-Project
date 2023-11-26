require("dotenv").config();
var pgp = require("pg-promise")();
var db = pgp(process.env.DB_CONNSTR);

class DB_QUERIES {
  get_trek() {
    return new Promise((resolve, reject) => {
      db.any("SELECT * FROM BIKE WHERE BIKE.b_brand_name = $1", "Trek")
        .then((data) => {
          console.log("DATA: ", JSON.stringify(data[0]));
          return resolve(JSON.stringify(data[0]));
        })
        .catch((error) => {
          console.log("ERROR:", error);
          return reject(error);
        });
    });
  }
}

const inst = new DB_QUERIES();

module.exports = { pgp, db, inst };
