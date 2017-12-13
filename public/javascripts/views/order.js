var OrderView = Backbone.View.extend({
  attributes: {
    id: "checkout",
  },
  
  template: App.templates.order,
  
  events: {
    "click #cancelOrder": "cancelClick",
    "submit": "orderSubmit",
    "click .fa-minus": "itemDecrease",
    "click .fa-plus": "itemIncrease",
  },
  
  orderSubmit: function(e) {
    e.preventDefault();

    alert("Thanks!.");
  },
  
  cancelClick: function(e) {
    e.preventDefault();
    
    App.trigger("cancelClick");
  },
  
  itemDecrease: function(e) {
    var id = $(e.target).closest("tr").data("id");
    
    App.trigger("removeClick", App.items.get(id));
    
    if (this.collection.length < 1) {
      App.trigger('cancelClick');
    }
  },
  
  itemIncrease: function(e) {
    var id = $(e.target).closest("tr").data("id");
    
    App.trigger("addClick", App.items.get(id));
  },
  
  calculateTotal: function() {
    return this.collection.toJSON().reduce(function(total, item) {
      return total + (item.price * item.quantity);
    }, 0);
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "all", this.render);
  },
  
  render: function() {
    var self = this;

    // render overall order
    this.$el.html(this.template({ total: this.collection.getTotal() }));
    
    // render cart items into order view's tbody element
    this.collection.each(function(item) {
      var orderItemView = new OrderItemView({ model: item });
      self.$("tbody").append(orderItemView.$el);
    });
    
    return this;
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
