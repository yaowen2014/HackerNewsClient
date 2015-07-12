describe('tab button', function(){
    var tabButton = null;

    var mockedComponent = {
        visible: ko.observable(false)
    };

    beforeEach(function(){
        mockedComponent.visible(false);

        tabButton = new App.ViewModels.TabButton("A", mockedComponent);
    })

    it("should init correctly", function(){
        expect(tabButton.active()).toEqual(false);
        expect(mockedComponent.visible()).toEqual(false);
    });

    it("should handle active change correctly", function(){
        tabButton.active(true);
        expect(mockedComponent.visible()).toEqual(true);
    });

});

describe('tabs list', function(){
    var tabsList = null;

    var ShownComponent = function(){
        this.visible = ko.observable(false);
    };

    var mockedComponentA = new ShownComponent();
    var mockedComponentB = new ShownComponent();

    beforeEach(function(){
        mockedComponentA.visible(false);
        mockedComponentB.visible(false);
        tabsList = new App.ViewModels.TabsList([
            new App.ViewModels.TabButton("A", mockedComponentA),
            new App.ViewModels.TabButton("B", mockedComponentB)
        ]);
    });

    it("should init correctly", function(){
        expect(tabsList.tabButtons.length).toEqual(2);
        expect(tabsList.tabButtons[0].buttonText).toEqual("A");
        expect(tabsList.tabButtons[1].buttonText).toEqual("B");

        //initial state the first tab button should be active
        expect(tabsList.activeButton()).toBe(tabsList.tabButtons[0]);
        expect(tabsList.tabButtons[0].active()).toEqual(true);
    });

    it("should handle click correctly", function(){
        tabsList.tabButtons[1].clickTab();
        expect(tabsList.activeButton()).toBe(tabsList.tabButtons[1]);
        expect(tabsList.tabButtons[0].active()).toEqual(false);
        expect(tabsList.tabButtons[1].active()).toEqual(true);
    });
});
