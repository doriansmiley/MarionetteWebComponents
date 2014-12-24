/**
 * Created by dsmiley on 12/24/14.
 */
Sp.AbstractCollection = Backbone.Collection.extend({
    constructor: function (model, options) {
        //mixin observable, now the object can define custom accessor methods and fully supports data binding
        //collections don't give us the ability natively to define custom attributes natively so this is a must
        //Models can assign listen to handlers in initialize to monitor when attribute value changes and respond accordingly
        Sp.ObjectUtils.mixinToInstnace(Sp.Subject, Sp.ListItemCollection, this);

        Backbone.Collection.prototype.constructor.call(this, model, options);
    }
});