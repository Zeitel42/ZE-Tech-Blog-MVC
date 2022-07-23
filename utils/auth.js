const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    console.log("user authorized");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
