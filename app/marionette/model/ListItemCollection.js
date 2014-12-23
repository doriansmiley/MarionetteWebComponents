/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemCollection = Backbone.Collection.extend({
    model:Sp.ListItemModel,
    el:'#itemRegion',
    save:function(attributes, options ){
        //nothing really to override unless we want to check preconditions before save
        Backbone.Collection.prototype.save.call(this, attributes, options );
    },
    sync:function( method, model, options){
        //sync records, this is the insertion point for a service. Use the method param to figure out what service method to call
        Backbone.Collection.prototype.sync.call(this, method, model, options);
    },
    toJSON:function( options ){
        //serialize the model. This is the insertion point for a serializer class
        Backbone.Collection.prototype.toJSON.call(this, options );
    }
    
});