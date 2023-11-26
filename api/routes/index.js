var express = require("express");
var router = express.Router();
const { db, inst } = require("./db");

/* GET home page. */
router.get("/", function (req, res, next) {
  inst
    .get_trek()
    .then((db_response) => {
      return res.send({ response: db_response });
    })
    .catch((err) => {
      return err;
    });
});

module.exports = router;
