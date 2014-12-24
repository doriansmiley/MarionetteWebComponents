/**
 * Created by dsmiley on 12/24/14.
 */
Sp.SettingsModel = Backbone.Model.extend({
    defaults:{
        active:false,
        backgroundColor:'chartreuse',
        border: 'solid 1px red'
    },
    save:function(attributes, options ){
        //nothing really to override unless we want to check preconditions before save
        Backbone.Model.prototype.save.call(this, attributes, options );
    },
    sync:function( method, model, options){
        //sync records, this is the insertion point for a service. Use the method param to figure out what service method to call
        Backbone.Model.prototype.sync.call(this, method, model, options);
    },
    toJSON:function( options ){
        //serialize the model. This is the insertion point for a serializer class
        Backbone.Model.prototype.toJSON.call(this, options );
    }
});