const router = require("express").Router();
const { Comment } = require("../../models/");
// const withAuth = require("../../utils/auth");

router.get("/"),
  async (req, res) => {
    try {
      const comments = await Comment.findAll({});
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  };
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
