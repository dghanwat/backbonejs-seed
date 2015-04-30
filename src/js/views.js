fb.views.Welcome = Backbone.View.extend({


    initialize: function () {
        var self = this;
        this.template = fb.templateLoader.get('welcome');
    },

    render: function () {
       this.$el.html(this.template(this.model));
        return this;
    },

});
