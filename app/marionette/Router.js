/**
 * Created by dsmiley on 12/24/14.
 */
Sp.Router = Backbone.Marionette.AppRouter.extend({
    controller:Sp.RouteController,
    constructor:function(){
        this.injector = null;
        Backbone.Marionette.AppRouter.prototype.constructor.call(this, arguments);
    }
});