(function(){
    App.ViewModels.Story = function(id){
        var self = this;

        this.title = ko.observable(null);

        this.score = ko.observable(null);

        this.url = ko.observable(null);

        this.createTime = ko.observable(null);

        this.creator = ko.observable(null);

        this.loaded = ko.observable(false);

        globalFirebaseRef.child('item/' + id).once("value", function(snapShot){
            var storyObj = snapShot.val();

            self.title(storyObj.title);

            self.score(storyObj.score);

            if(storyObj.url && storyObj.url.length > 0) {
                self.url(storyObj.url);
            } else {
                self.url("https://news.ycombinator.com/item?id=" + storyObj.id);
            }

            self.createTime(storyObj.time * 1000);

            self.creator(storyObj.by);

            self.loaded(true);
        });

        this.scoreText = ko.computed(function(){
            return self.score() + " points";
        });

        this.createInfoText = ko.computed(function(){
            return "submitted " + moment(self.createTime()).fromNow() + " by " + self.creator();
        });

        this.gotoPost = function(){
            window.location = self.url();
        }
    }
}).call(window);
