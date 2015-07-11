(function(){
    var Page = function(){
        var self = this;
        this.topStoriesList = new App.ViewModels.List(App.ViewModels.Story, "topstories", {
            needInit: true
        });

        $(window).scroll(function(){
            if (window.scrollY > document.body.clientHeight - window.innerHeight - 50) {
                self.topStoriesList.loadMore();
            }
        });
    }

    App.page  = new Page();

    $(document).ready(function(){
        ko.applyBindings(App.page);
    });

}).call(window);
