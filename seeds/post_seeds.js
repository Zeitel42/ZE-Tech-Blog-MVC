const { Post } = require("../models");

const postData = [
  {
    title: "Wait",
    post_text: "Just one minute here I can see that she's trying to read me.",
    user_id: 1,
  },
  {
    title: "Show",
    post_text:
      "Me the power child I'd like to say that I'm down on my knees today.",
    user_id: 2,
  },
  {
    title: "The Day",
    post_text:
      "I tried to live, I wallowed in the blood and mud with all the other pigs.",
    user_id: 3,
  },
  {
    title: "Follow Me",
    post_text: "Into the desert as thirsty as you are.",
    user_id: 4,
  },
  {
    title: "Crack",
    post_text: "A smile and cut your mouth and drown in alcohol.",
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
