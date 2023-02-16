const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

// this Contact on index.js now will be used to create entries or the collection should be populated

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  {
    name: "Mohit",
    phone: "111111111",
  },
  {
    name: "Bros",
    phone: "11164641111",
  },
  {
    name: "CoolGuy",
    phone: "111111111",
  },
];

//get function for displaying the contacts

app.get("/", function (req, res) {
  //fetching the contacts

  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }

    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  });
});

app.post("/create-contact", function (req, res) {
  //   return res.redirect("/practice");

  //   console.log(req, body);
  //   console.log(req, body.name);
  //   console.log(req, body.phone);

  //   contactList.push({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //   });

  // contactList.push(req.body); //reduced code

  //   return res.redirect("/");
  // return res.redirect("back"); //back is shortcut

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("there's an error");
        return;
      }

      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
});

/*** params ***/

// app.get("/delete-contact/:phone", function (req, res) {
//   console.log(req.params);
//   let phone = req.params.phone;
// });

/*** Query Params ***/

app.get("/delete-contact", function (req, res) {
  // console.log(req.query);
  // let phone = req.query.phone;
  // let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }
  // return res.redirect("back");

  // console.log(req.query);
  // ** Get the ID from query in the url **//
  let id = req.query.id;

  // find the contact in the Data Base using id and delete it
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("yup!", port);
});
