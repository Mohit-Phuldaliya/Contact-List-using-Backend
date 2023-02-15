const mongoose = require("mongoose"); //we required the mongoose library

mongoose.connect("mongodb://localhost/contact_list_db"); // we connected mongoose to Data base

//acquire the connection (to check if it is successful or not)
const db = mongoose.connection; //the connection which is there present between the mongoose and data base is or db, db is goint to be use for accesing the data base or checking wther we have connected to data base or not.

//if there's an error then print error
db.on("error", console.error.bind(console, "error connecting to db"));

//if it is up and running then print successful
db.once("open", function () {
  console.log("Successfully connected to the database");
});
