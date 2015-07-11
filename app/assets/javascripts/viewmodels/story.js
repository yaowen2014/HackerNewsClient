(function(){
    App.ViewModels.Story = function(id){
        var self = this;

        this.title = ko.observable(null);

        this.score = ko.observable(null);

        this.url = ko.observable(null);

        globalFirebaseRef.child('item/' + id).once("value", function(snapShot){
            var storyObj = snapShot.val();

            self.title(storyObj.title);

            self.score(storyObj.score);

            self.url(storyObj.url);
        });
    }
}).call(window);
