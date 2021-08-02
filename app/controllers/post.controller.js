const db = require("../models");
const Posts = db.post;
const User = db.user;
const mongoose = require("mongoose");

// add post
exports.posts = async (req, res) => {
    try{
        const post = new Posts({
            title: req.body.title,
            body: req.body.body,
            username: req.body.username
        });
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const posts = await post.save();
        if (!posts) {
            return res.status(404).send({ message: "Post Not found." });
        }
       return res.status(200).send({
            id: posts._id,
            title: posts.title,
            email: posts.body,
            userid: posts.userid
        });
    }catch(err){
        console.log(err)
    }
};

// add rating in Post
exports.rating = async (req, res) => {
    try{
        const ID = (req.body.id).trim();
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const post = await Posts.findOne({
            _id: mongoose.Types.ObjectId(ID)
        })
        if (!post) {
            return res.status(404).send({ message: "Post Not found." });
        }
        post.newRate.map(el => {
            if(el.username == req.body.username){
                return res.status(404).send({ message: "User Already Rate this post." });
            }
        })
        const arr = []
        const data = {
            username: req.body.username,
            rate: req.body.rate
        }
        arr.push(data)
        post.newRate.push(data)
        const postdata = await post.save()
        return res.status(200).send(postdata);
    }catch(err) {
        console.log(err)
    }
};


// show all post

exports.allPost = async (req, res) => {
    try{
        const post = await Posts.find()
        return res.status(200).send(post);
    }catch(err) {
        console.log(err)
    }
};


// Delete Single Post

exports.deletePost = async (req, res) => {
    try{
        const ID = (req.body.id).trim();
        const post = await Posts.deleteOne({
            _id: mongoose.Types.ObjectId(ID)
        })
        const allpost = await Posts.find()
        return res.status(200).send(allpost);
    }catch(err){
        console.log(err)
    }
};
