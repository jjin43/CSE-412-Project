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

app.post("/createorder", (req, res) => {

  if(!req.body.customerID || !req.body.payment_method || !req.body.bike || !req.body.misc)
    res.end()

  console.log(req.body)
  const customerID = req.body.customerID;
  const pay_method = req.body.payment_method;
  const bike = req.body.bike;
  const misc = req.body.misc;

  let order_id = '';
  let values = [customerID, pay_method];
  let line = "INSERT INTO orders (o_store_id, o_customer_id, o_payment_info, o_status) VALUES (1, $1, $2, 'PENDING'); Select \"o_order_id\" From orders Where o_order_id=lastval();";
  db.any(line, values)
  .then((data) => {
    console.log("DATA: ", JSON.stringify(data[0]));
    order_id = data[0].o_order_id;
    for(var i=0; i<bike.length; i++){
      let values = [order_id, bike[i].item_id, bike[i].quantity];
      let line = "INSERT INTO order_bike_items (obi_order_id, obi_bike_id, obi_quantity) VALUES ($1, $2, $3);"
      db.any(line, values)
      .then((data) => {
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
    }
  
    for(var i=0; i<misc.length; i++){
      let values = [order_id, misc[i].item_id, misc[i].quantity]
      let line = "INSERT INTO order_misc_items (omi_order_id, omi_item_id, omi_quantity) VALUES ($1, $2, $3);"
      db.any(line, values)
      .then((data) => {
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end();
      });
    }
  
    values = [order_id];
    line = "UPDATE orders SET o_status='INPROGRESS' WHERE o_order_id=$1";
    db.any(line, values)
    .then((data) => {
    })
    .catch((error) => {
      console.log("ERROR:", error);
      res.end();
    });
  
    res.send({state: "1", order_id: order_id});
  })
  .catch((error) => {
    console.log("ERROR:", error);
    res.end();
  });
  
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

app.post("/signup", (req, res) => {
  if(!req.headers.name || !req.headers.email || !req.headers.password || !req.headers.payment_method){
    console.log("Sign-up with insufficient parameter")
    res.send("Missing Sign-up Information")
  }

  values = [req.headers.name, req.headers.email, req.headers.password, req.headers.payment_method]
  let line = "INSERT INTO customer (c_name, c_email, c_password, c_payment_method) VALUES ($1, $2, $3, $4)"
  db.any("SELECT * FROM customer Where c_email=$1", req.headers.email)
  .then((data) => {
    if(data[0]){
      console.log("Signup Email Exists")
      res.send({data:'Exists'})
    }
    else{
      db.any(line, values)
      .then((data) => {
        console.log("DATA: ", JSON.stringify(data[0]));
        res.json({data:'Success'});
      })
      .catch((error) => {
        console.log("ERROR:", error);
        res.end()
      });
    }
  })
  .catch((error) => {
    console.log("ERROR:", error);
    res.send("Failed");
  });

  
});
/* 
app.post("/changePass", (req,res) => {
  if(!req.headers.username || !req.headers.password) {
    console.log("Pass change fail")
    res.send("Pass change field missing")
  }
  let line = "SELECT * FROM customer WHERE c_email=$1 AND c_password=$2;";
  values = [req.headers.username, req.headers.password]
  if(newpass != c_password){
    c_password = newpass;
    newpass = NULL;
  }
  })
  */

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
  console.log("Rtrieving Account: userID-" + req.params.userId);
  const userId = req.params.userId;
  if (!req.params.userId) {
    console.log("no user id provided");
    res.end();
    return;
  }

  const custInfoQuery = "SELECT * FROM customer WHERE c_customer_id=$1;";
  const ordersBikesQuery = "SELECT * FROM orders JOIN order_bike_items ON o_order_id=obi_order_id JOIN (SELECT b_bike_serial_num, b_model, b_price From bike) AS foo ON obi_bike_id=b_bike_serial_num WHERE o_customer_id=$1;"
  const ordersMiscsQuery = "SELECT * FROM orders JOIN order_misc_items ON o_order_id=omi_order_id JOIN (SELECT mi_item_id, mi_item_name, mi_item_price From misc_items) AS foo ON omi_item_id=mi_item_id WHERE o_customer_id=$1;"
  const values = [userId];

  db.any(custInfoQuery, values)
    .then((data) => {
      let result = { userInfo: {}, orders: {}};
      // order = [orderid, item:[], status, payment_info, store_id]
      result["userInfo"] = data[0];

      db.any(ordersBikesQuery, values) 
        .then((data) => {
          // console.log(data[0])
          for(var i=0; i<data.length; i++){
            let curr_order_id = data[i]['o_order_id'];
            if(!result.orders.hasOwnProperty(curr_order_id)){
              result.orders[curr_order_id] = {
                store_id:     data[i]['o_store_id'],
                status:       data[i]['o_status'], 
                payment_info: data[i]['o_payment_info'], 
                item:         [{name: data[i]['b_model'], quantity: data[i]['obi_quantity'], price: data[i]['b_price']}]
              }
            }
            else{
              result.orders[curr_order_id].item.push({name: data[i]['b_model'], quantity: data[i]['obi_quantity'], price: data[i]['b_price']});
            }
          }

          db.any(ordersMiscsQuery, values) 
          .then((data) => {
            //console.log(data[0])
            for(var i=0; i<data.length; i++){
              let curr_order_id = data[i]['o_order_id'];
              if(!result.orders.hasOwnProperty(curr_order_id)){
                result.orders[curr_order_id] = {
                  store_id:     data[i]['o_store_id'],
                  status:       data[i]['o_status'], 
                  payment_info: data[i]['o_payment_info'], 
                  item:         [{name: data[i]['mi_item_name'], quantity: data[i]['omi_quantity'], price: data[i]['mi_item_price']}]
                }
              }
              else{
                result.orders[curr_order_id].item.push({name: data[i]['mi_item_name'], quantity: data[i]['omi_quantity'], price: data[i]['mi_item_price']});
              }
            }
  
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
