/**
 * Created by dsmiley on 12/23/14.
 */
Sp.AbstractBindingBehavior = Backbone.Marionette.Behavior.extend({
    constructor:function(options, view) {
        this.modelEvents = this.getModelEvents();
        this.collectionEvents = this.getCollectionEvents();
        Backbone.Marionette.Behavior.prototype.constructor.call(this, options, view);
    }
});

//stub for override
Sp.AbstractBindingBehavior.prototype.getModelEvents = function () {
    return {};
}

//stub for override
Sp.AbstractBindingBehavior.prototype.getCollectionEvents = function () {
    return {};
}