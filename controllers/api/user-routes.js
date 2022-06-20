const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    // get all Users
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
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

    // if (!user) {
    //   res.status(400).json({ message: "No user account found!" });
    //   return;
    // }

    // const validPassword = user.checkPassword(req.body.password);

    // if (!validPassword) {
    //   res.status(400).json({ message: "No user account found!" });
    //   return;
    // }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

router.post("/logout", (req, res) => {
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
