/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemCollection = Sp.AbstractCollection.extend({
    model:Sp.ListItemModel,
    initialize: function( model, options ){
        var _sortType = 'name';
        this.addProperties({
            sortType:{
                get: function () {
                    return _sortType;
                },
                set: function (value) {
                    _sortType = value;
                    this.comparator = ( _sortType == 'dob' ) ? this.sortByDob : 'name';
                    this.sort();
                    this.Notify(value, 'sortType');
                }
            }
        });
    },
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

Sp.ListItemCollection.prototype.sortByDob = function ( value1, value2) {
    //return -1 if the first model should come before the second, 0 if they are of the same rank and 1 if the first model should come after
    return ( new Date( value1.dob ) > new Date( value2.dob ) ) ? -1 : 1;
}


