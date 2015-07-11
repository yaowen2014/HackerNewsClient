(function(){
    var Page = function(){
        this.topStoriesList = new App.ViewModels.List(App.ViewModels.Story, "topstories", {
            needInit: true
        });
    }

    App.page  = new Page();

    $(document).ready(function(){
        ko.applyBindings(App.page);
    });

}).call(window);
