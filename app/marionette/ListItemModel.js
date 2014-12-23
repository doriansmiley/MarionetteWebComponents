/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemModel = Backbone.Model.extend({
    initialize:function( attributes, options ){

    },
    defaults:{
        'name':null,
        'value':null,
        'dob':null
    },
    save:function(attributes, options ){
        //nothing really to override unless we want to check preconditions before save
        //for example
        if( this.get('name') === null || this.get('name') === undefined ){
            throw new Error('Sp.ListItem.save: name is required')
        }
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
