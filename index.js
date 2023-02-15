const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");

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

app.get("/", function (req, res) {
  return res.render("home", {
    title: "Contact List",
    contact_list: contactList,
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

  contactList.push(req.body); //reduced code

  //   return res.redirect("/");
  return res.redirect("back"); //back is shortcut
});

/*** params ***/

// app.get("/delete-contact/:phone", function (req, res) {
//   console.log(req.params);
//   let phone = req.params.phone;
// });

/*** Query Params ***/

app.get("/delete-contact", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;
  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);
  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("yup!", port);
});
