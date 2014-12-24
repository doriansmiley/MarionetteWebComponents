/**
 * Created by dsmiley on 12/24/14.
 */
Sp.Router =  Backbone.Marionette.AppRouter.extend({
    constructor:function( options ){
        //set up the controller
        options.controller = this.getController( options.injector );
        Backbone.Marionette.AppRouter.prototype.constructor.call(this, options);
    }
});

Sp.Router.prototype.getController = function( injector ){
    return new Sp.RouteController( {injector:injector} );
}