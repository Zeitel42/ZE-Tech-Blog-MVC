const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    // get all Users
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    const user = User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found, you suck!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User not created." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const userData = user.dataValues;

    console.log(
      "Raw password: " + req.body.password,
      "Encrypted password: " + userData.password
    );

    if (!(await bcrypt.compare(req.body.password, userData.password))) {
      res.status(400).json({ message: "ya done goofed" });
      return;
    }

    console.log(req.body.username, req.body.password);

    // if (!user) {
    //   res.status(400).json({ message: "No user account found! Balls!" });
    //   return;
    // }

    // const validPassword = user.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res.status(400).json({ message: "No user account found! Testes!" });
    //   return;
    // }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found! Scrotums!" });
  }
});

router.post("/logout", (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  try {
    const user = User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found, you suck!" });
  }
});

module.exports = router;
