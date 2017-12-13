var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  attributes: {
    id: "checkout"
  },
  render: function() {
    this.$el.html(this.template({
      quantity: this.collection.getQuantity(),
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
    App.$el.find('#content').html(this.$el);
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});