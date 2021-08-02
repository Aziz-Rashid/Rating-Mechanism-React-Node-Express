const mongoose = require("mongoose");

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title: String,
        body: String,
        username: String,
        newRate: [{
            username: String,
            rate: Number,
        }],
    })
);

module.exports = Post;
