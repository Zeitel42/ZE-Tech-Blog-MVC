const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    console.log("this is the shit");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
