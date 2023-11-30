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

app.disable('etag');

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

app.get('/ping', (req, res) => {
  res.send('pong')
})

// Fecth Bikes data, default SELECT *, filter fields pass through param
app.get('/getBikes', (req, res) => {
  if(req.params.filter==='True'){
    let line = "SELECT * FROM BIKE WHERE "
    let values = []
    paramCount = 1
    
    // Handle filters here
    if(req.params.brand)
      line = line + "b_brand == $" + paramCount++ + "AND"
      values.push(req.params.brand)

    if(req.params.maxprice)
      line = line + "b_price <= $" + paramCount++ + "AND"
      values.push(req.params.maxprice)

    if(req.params.minprice)
      line = line + "b_price >= $" + paramCount++ + "AND"
      values.push(req.params.minprice)

    //...

    line = line + "1==1"
    db.any(line, values)
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data[0]));
      res.send(data)
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end()
    });

  }
  else{
    db.any("SELECT * FROM BIKE")
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data[0]));
      res.send(data)
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end()
    });
  }

})

app.get('/getMisc', (req, res) => {
  if(req.params.filter===true){
    let line = "SELECT * FROM misc_items WHERE "
    let values = []
    paramCount = 1
    
    // Handle filters here
    if(req.params.brand)
      line = line + "mi_name == $" + paramCount++ + "AND"
      values.push(req.params.brand)

    if(req.params.maxprice)
      line = line + "mi_price <= $" + paramCount++ + "AND"
      values.push(req.params.maxprice)

    if(req.params.minprice)
      line = line + "mi_price >= $" + paramCount++ + "AND"
      values.push(req.params.minprice)

    line = line + "1==1"
    db.any(line, values)
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data[0]));
      res.send(data)

    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end()
    });
  }
  else{
    db.any("SELECT * FROM misc_items")
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data[0]));
      res.send(data)
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end()
    });
  }

})

app.get('/login', (req, res) => {
  if(!req.params.username || !req.params.password){
    console.log("Incomplete Login")
    res.send('Provide Username and Password')
  }
  else{
    let line = "SELECT * FROM customer WHERE c_name=='$1' AND c_password=='$2'" 
    let values = [req.params.username, req.params.password]

    db.any(line, values)
    .then((data) => {
      console.log("DATA: ", JSON.stringify(data[0]));
      res.send(data)
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end()
    });
  }

})


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
