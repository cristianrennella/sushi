var App = {
  templates: JST,
  $el: $('body'),
  indexView: function() {
    this.index = new IndexView();
    this.renderItems();
    this.createCart();
    this.renderViews();
    this.bindEvents();
  },
  renderViews: function() {
    this.headerView = new HeaderView({
      collection: this.cart
    });
  },
  renderItems: function() {
    this.items.each(this.renderItemView);
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });
  },
  renderItemView: function(item) {
    new ItemView({
      model: item
    });
  },
  renderCheckout: function() {
    this.cart.view.hidden = true;
    this.cart.view.$el.hide();
    
    var view = new OrderView({ collection: this.cart });
    this.$el.find('#content').html(view.render().el);
  },
  renderItemDetails: function(item) {
    new ItemDetailsView({
      model: item
    });

    var id = item.get('id');
    
    App.router.navigate("menu/" + String(id));
  },
  getNextIdx: function(currentIdx, direction) {
    var length = this.items.length;
    
    // determine next index based on wrapping (ex. last item will wrap to first)
    if (direction === "next" && currentIdx === length - 1) {
      return 0;
    } else if (direction === "next") {
      return currentIdx + 1;
    } else if (direction === "prev" && currentIdx === 0) {
      return length - 1;
    } else {
      return currentIdx - 1;
    }
  },
  navClick: function(id, direction) {
    var currentItem = this.items.get(id);
    var currentIdx = _.indexOf(this.items.models, currentItem);
    var nextIdx = this.getNextIdx(currentIdx, direction);
    var nextItem = this.items.at(nextIdx);
    
    this.router.navigate("/");
    this.renderItemDetails(nextItem);
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("add_to_cart", this.cart.addItem.bind(this.cart));
    this.on("renderDetails", this.renderItemDetails);
    this.on("renderCheckout", this.renderCheckout);
    this.on("navClick", this.navClick)
    this.on("addClick", this.cart.addItem.bind(this.cart))
    this.on("removeClick", this.cart.removeItem.bind(this.cart))
  },
};

Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});

Handlebars.registerHelper("isOne", function(total) {
  return total === 1;
});