var express = require("express");



var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function(req, res) {
  res.send("I finally got this working!");
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
