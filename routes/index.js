var path = require("path"),
    _ = require("underscore"),
    Items = require(path.resolve(path.dirname(__dirname), "modules/items"));

module.exports = function(router) {
  router.get("/", function(req, res, next) {
    res.render("index", { 
      items: Items.get(),
    });
  });
  router.get("/checkout", function(req, res, next) {
    res.redirect("/#checkout");
  });
  router.get("/menu/:id", function(req, res, next) {
    res.redirect("/#menu/" + req.params.id);
  });
};
