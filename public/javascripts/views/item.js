var ItemView = Backbone.View.extend({
  tagName: "li",
  events: {
    "click a.add_cart": "addToCart",
    "click header": "renderDetails"
  },
  addToCart: function(e) {
    e.preventDefault();
    App.trigger("add_to_cart", this.model);
  },
  renderDetails: function() {
    App.trigger("renderDetails", this.model);
  },
  template: App.templates.item,
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", id);
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.$el.find('#items'));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  },
});