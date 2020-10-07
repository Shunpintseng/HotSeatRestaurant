// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Reservation (DATA)
// =============================================================
var reservations = [];
var waitlist = [];



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/makeReservations", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});


app.get("/viewReservations", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);

  });

// Create New Reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if(reservations.length >= 5){
  waitlist.push(newReservation);
  }else{
      reservations.push(newReservation);
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
