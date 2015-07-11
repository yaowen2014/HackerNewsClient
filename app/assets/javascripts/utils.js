function proxyEvents(proxy, originalObj, options) {
    options = options || {};
    if(originalObj._events) {
        delete(originalObj._events["all"]); //remove the old proxy listener
    }

    originalObj.on("all", function(eventName, event){
        var rewritten = originalObj.eventNameMap;
        if(rewritten && _.contains(_.keys(rewritten), eventName)) {
            eventName = rewritten[eventName];
        }
        proxy.trigger(eventName, event);
    });
}
