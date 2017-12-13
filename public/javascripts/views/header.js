var HeaderView = Backbone.View.extend({
  template: App.templates.header,
  events: {
    "click a": "checkout"
  },
  checkout: function(e) {
    e.preventDefault();
    App.trigger("renderCheckout");
  },
  render: function() {
    this.$el.html(this.template({
      total: this.collection.quantity
    }));
    App.$el.find('header').first().html(this.$el);
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "all", this.render);
  }
});