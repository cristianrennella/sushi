var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: $("#cart").get(0),
  events: {
    "click a.checkout": "checkout",
    "click a.left": "emptyCart"
  },
  checkout: function(e) {
    e.preventDefault();
    this.$el.slideUp(200);
    App.trigger("renderCheckout");
  },
  emptyCart: function(e) {
    e.preventDefault();
    this.collection.reset();
    App.cart.view.render();
    App.cart.trigger("cart_updated");
  },
  render: function() {
    if (this.hidden) {
      this.$el.hide();
      return;
    }
    
    if(this.collection.length === 0) {
      this.$el.slideUp(200);
    } else {
      this.$el.slideDown(200);
    }

    this.$el.html(this.template({
      quantity: this.collection.getQuantity(),
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }
});