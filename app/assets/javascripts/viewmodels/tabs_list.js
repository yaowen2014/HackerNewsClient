(function(){
    App.ViewModels.TabButton = function(title, shownComponent, options){
        var self = this;
        options = options || {};

        this.active = ko.observable(false);

        this.shownComponent = shownComponent;

        App.Mixins.WithEvent.call(this);

        this.domNode = ko.observable(null);

        this.clickTab = function(){
            self.trigger("afterActive", {
                target: self
            });
        }

        this.eventNameMap = {
            "afterActive": "afterTabActive"
        }

        this.active.subscribe(function(){
            shownComponent.visible(self.active());
        });

        this.buttonText = title;
    }

    App.ViewModels.TabsList = function(tabButtons){
        var self = this;

        App.Mixins.WithEvent.call(this);

        this.tabButtons = tabButtons;

        this.activeButton = ko.observable(null);

        _.each(tabButtons, function(tabButton){
            proxyEvents(self, tabButton);
        });

        this.on("afterTabActive", function(event){
            self.activeButton().active(false);
            self.activeButton(event.target);
            self.activeButton().active(true);
        });

        this.activeButton(this.tabButtons[0]);
        this.activeButton().active(true);
    }
}).call(window);
