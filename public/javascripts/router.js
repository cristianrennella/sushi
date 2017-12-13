App.router = new (Backbone.Router.extend({
  routes: {
    "checkout": "checkout",
    "menu": "index",
    "menu/:id": "menuItem"
  },
  
  menuItem: function(id) {
    App.router.navigate("/");
    App.indexView();
    App.renderItemDetails(App.items.get(id));
  },
  
  checkout: function() {
    App.renderCheckout();
  },
  
  index: function() {
    App.indexView();
  },
  
  initialize: function() {
    // create index route, using regex (avoid '/' requirement on routes object)
    this.route(/^\/?$/, "index", this.index);
  },
}))();

Backbone.history.start({
  pushState: true
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  App.router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});