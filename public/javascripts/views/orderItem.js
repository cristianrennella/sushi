var OrderItemView = Backbone.View.extend({
  tagName: "tr",
  
  template: App.templates.orderItem,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  
  initialize: function() {
    this.$el.attr("data-id", this.model.id);
    this.render();
  },
});
