(function(){
    App.Mixins.WithEvent = function(){
        var self = this;

        _.extend(this, Backbone.Events);

    }
}).call(window);
