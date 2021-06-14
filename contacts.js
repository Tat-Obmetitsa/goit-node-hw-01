const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const id = require('shortid');;


function listContacts() {
  fs.readFile(contactsPath)
  .then((data) => {
  console.table(JSON.parse(data))
  })
  .catch((err) => console.error(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
  .then((data) => {
  const contacts = JSON.parse(data);
  const contact = contacts.find(contact => contact.id == contactId);
  console.table(contact);
  })
  .catch((err) => console.error(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
  .then((data) => {
  const contacts = JSON.parse(data);
  const contactsFilter = contacts.filter(contact => contact.id != contactId);
  fs.writeFile(contactsPath, JSON.stringify(contactsFilter, null, '\t'));
  console.table(contactsFilter);
  })
  .catch((err) => console.error(err));
}

function addContact(name, email, phone) {
  const user = {
    id: id.generate(),
    name,
    email,
    phone
  }
  fs.readFile(contactsPath)
  .then((data) => {
  const contacts = JSON.parse(data)
  const users = [...contacts, user]
  fs.writeFile(contactsPath, JSON.stringify(users, null, '\t'));
  console.table(users);
  })
  .catch((err) => console.error(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};