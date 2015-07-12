(function(){
    var Page = function(){
        var self = this;
        this.topStoriesList = new App.ViewModels.List(App.ViewModels.Story, "topstories", {
            needInit: true
        });

        this.newStoriesList = new App.ViewModels.List(App.ViewModels.Story, "newstories", {
            needInit: true
        });

        this.showStoriesList = new App.ViewModels.List(App.ViewModels.Story, "showstories", {
            needInit: true
        });

        this.askStoriesList = new App.ViewModels.List(App.ViewModels.Story, "askstories", {
            needInit: true
        });

        this.jobStoriesList = new App.ViewModels.List(App.ViewModels.Story, "jobstories", {
            needInit: true
        });

        this.tabsList = new App.ViewModels.TabsList([
            new App.ViewModels.TabButton("Top", self.topStoriesList),
            new App.ViewModels.TabButton("New", self.newStoriesList),
            new App.ViewModels.TabButton("Show", self.showStoriesList),
            new App.ViewModels.TabButton("Ask", self.askStoriesList),
            new App.ViewModels.TabButton("Job", self.jobStoriesList)
        ]);

        $(window).scroll(function(){
            if ($(window).scrollTop() > $(document).outerHeight() - window.innerHeight - 50) {
                self.tabsList.activeButton().shownComponent.loadMore();
            }
        });
    }

    App.page  = new Page();

    $(document).ready(function(){
        ko.applyBindings(App.page);
    });

}).call(window);
