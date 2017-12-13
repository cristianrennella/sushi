var ItemDetailsView = Backbone.View.extend({
  template: App.templates.item_details,
  attributes: {
    id: "item_details"
  },
  events: {
    "click a.add_cart": "addToCart",
    "click a.close": "close",
    "click div.nav": "navClick"
  },
  navClick: function(e) {
    e.preventDefault();
    var direction = $(e.currentTarget).hasClass("prev") ? "prev" : "next";
    var id = this.model.id;
    
    App.trigger("navClick", id, direction);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  close: function(e) {
    e.preventDefault();
    App.indexView();
  },
  addToCart: function(e) {
    e.preventDefault();
    App.trigger("add_to_cart", this.model);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.find('#content').html(this.$el);
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});