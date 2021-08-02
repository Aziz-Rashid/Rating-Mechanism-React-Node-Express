const controller = require("../controllers/post.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/post", controller.posts);
  app.post("/api/rating", controller.rating);
  app.get("/api/allpost", controller.allPost);
  app.post("/api/deletePost",controller.deletePost);
};
