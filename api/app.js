var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { disconnect } = require("process");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.disable("etag");

app.use("/", indexRouter);
app.use("/users", usersRouter);

//***************************************************************** */
//Example of querying the database using db.js route, can be deleted later
const { db } = require("./routes/db");

db.any("SELECT * FROM BIKE")
  .then((data) => {
    console.log("DATA: ", JSON.stringify(data[0]));
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });
//***************************************************************** */

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/getBikeBrands", (req, res) => {
  console.log(req.query);
  const line = "SELECT DISTINCT b_brand_name FROM bike";
  db.any(line).then((data) => {
    let brands = [];
    data.map((brand) => {
      return brands.push(brand.b_brand_name);
    });
    console.log(brands);
    res.send(brands);
  });
});

// Fecth Bikes data, default SELECT *, filter fields pass through param
app.get("/getBikes", (req, res) => {
  console.log(req.query);
  if (req.query.filter === "true") {
    let line = "SELECT * FROM bike WHERE ";
    let values = [];
    let paramCount = 1;

    // Handle filters here
    if (req.query.brand) {
      line = line + "b_brand_name=$" + paramCount++ + " AND ";
      values.push(req.query.brand);
    }

    if (req.query.maxPrice) {
      line = line + "b_price<=$" + paramCount++ + " AND ";
      values.push(req.query.maxPrice);
    }

    if (req.query.minPrice) {
      line = line + "b_price>=$" + paramCount++ + " AND ";
      values.push(req.query.minPrice);
    }

    //...

    line = line + "1=1;";
    console.log(line);
    
    db.any(line, values)
      .then((data) => {
        console.log("DATA: ", JSON.stringify(data[0]));
        res.send(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
  } else {
    db.any("SELECT * FROM BIKE")
      .then((data) => {
        console.log("DATA: ", JSON.stringify(data[0]));
        res.send(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
  }
});

app.get("/getMisc", (req, res) => {
  if (req.params.filter === true) {
    let line = "SELECT * FROM misc_items WHERE ";
    let values = [];
    let paramCount = 1;

    // Handle filters here
    if (req.params.brand)
      line = line + "mi_item_name == $" + paramCount++ + "AND";
    values.push(req.params.brand);

    if (req.params.maxprice)
      line = line + "mi_item_price <= $" + paramCount++ + "AND";
    values.push(req.params.maxprice);

    if (req.params.minprice)
      line = line + "mi_item_price >= $" + paramCount++ + "AND";
    values.push(req.params.minprice);

    line = line + "1==1";
    db.any(line, values)
      .then((data) => {
        console.log("DATA: ", JSON.stringify(data[0]));
        res.send(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
  } else {
    db.any("SELECT * FROM misc_items")
      .then((data) => {
        console.log("DATA: ", JSON.stringify(data[0]));
        res.send(data);
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
  }
});

app.post("/login", (req, res) => {
  if (!req.headers.username || !req.headers.password) {
    console.log("Incomplete Login");
    res.send("-1");
  } else {
    let line = "SELECT * FROM customer WHERE c_email=$1 AND c_password=$2;";
    let values = [req.headers.username, req.headers.password];

    db.any(line, values)
      .then((data) => {
        console.log(data[0].c_customer_id);
        // Somewhat scuffed way of getting this info, but theoretically,
        // this query should only return one tuple.
        let userID = data[0].c_customer_id;
        if (userID) {
          console.log("Login Succeed - user: " + userID);
          res.send(`${userID}`);
        } else res.send("0");
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
  }
});

app.get("/getUser/:userId", (req, res) => {
  console.log(req.params.userId);
  const userId = req.params.userId;
  if (!req.params.userId) {
    console.log("no user id provided");
    res.end();
    return;
  }

  const custInfoQuery = "SELECT * FROM customer WHERE c_customer_id=$1;";
  const ordersInfoQuery = "SELECT * FROM orders WHERE o_customer_id=$1;";
  const values = [userId];

  db.any(custInfoQuery, values)
    .then((data) => {
      let result = { userInfo: {}, orders: [] };
      result["userInfo"] = data[0];

      db.any(ordersInfoQuery, values)
        .then((data) => {
          result["orders"] = data;
          console.log(result);
          res.send(result);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
          res.end();
        });
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.end();
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const handleShutdown = async () => {
  console.log("Shutting down gracefully. Closing database connection.");

  try {
    // Close the database connection
    await db.$pool.end();
    console.log("Database connection closed successfully.");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }

  // Exit the process
  process.exit(0);
};

// Listen for SIGTERM and SIGINT signals
process.on("SIGTERM", handleShutdown);
process.on("SIGINT", handleShutdown);

module.exports = app;
