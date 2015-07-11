(function(){
    App.ViewModels.List = function(listItemVmKlass, restfulPath, options){
        var self = this;

        this.loadedPageNum = ko.observable(0);

        this.elements = ko.observableArray();

        this.pageSize = options.pageSize || 10;

        this.inited = false;

        this.loading = ko.observable(false);

        var unlockLoadingTimeout = null;

        this.loadMore = function(){
            if(self.loading()) {
                return;
            }
            unlockLoadingTimeout && clearTimeout(unlockLoadingTimeout);
            self.loading(true);
            for(var childIndex = self.pageSize * self.loadedPageNum();
                childIndex < self.pageSize * (self.loadedPageNum() + 1);
                childIndex++) {
                globalFirebaseRef.child(restfulPath).child(childIndex).once('value', function(snapShot) {
                    var itemId = snapShot.val();
                    self.elements.push(new listItemVmKlass(itemId));
                });
            }

            self.loadedPageNum(self.loadedPageNum() + 1);

            unlockLoadingTimeout = setTimeout(function(){
                self.loading(false);
            }, 300);
        }

        if(options.needInit) {
            self.loadMore();
        }
    }
}).call(window);
