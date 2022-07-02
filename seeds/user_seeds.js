const { User } = require("../models");

const userData = [
  {
    username: "johnny_ringo",
    email: "johnnyr@gmail.com",
    password: "password123",
  },
  {
    username: "doc_holliday",
    email: "doch@gmail.com",
    password: "password123",
  },
  {
    username: "wyatt_earp",
    email: "wyatte@gmail.com",
    password: "password123",
  },
  {
    username: "john_tyler",
    email: "johnt@gmail.com",
    password: "password123",
  },
  {
    username: "zac_eitel",
    email: "zaceitel@gmail.com",
    password: "password123",
  },
  {
    username: "pooja",
    email: "pooja@gmail.com",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
