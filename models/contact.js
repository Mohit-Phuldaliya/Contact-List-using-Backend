//since mongoose is being used to create the schema
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  //in that schema we need to give the fields
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

//since we have created our schema we need to tell what would be the name of the collection which will be using this schema

const Contact = mongoose.model("Contact", contactSchema);

//Contact have C capital as whenever u creating a model name or collection name you should keep the 1st char capital as the naming convention by default.

module.exports = Contact;
