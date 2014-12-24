/**
 * Created by dsmiley on 12/24/14.
 */
Sp.RouteController = Backbone.Marionette.Controller.extend({
    constructor: function ( options ) {
        if( options.injector === null || options.injector === undefined ){
            throw new Error('Sp.RouteController.prototype.constructor: injector is required');
        }
        this.injector = options.injector;
        Backbone.Marionette.Controller.prototype.constructor.call(this, options);
    },
    initialize: function () {
        this.settingsModel = this.injector.inject('SettingsModel')
    }
});

Sp.RouteController.prototype.routeToSettings = function () {
    //update route model
    this.settingsModel.set('active', true);
}

Sp.RouteController.prototype.routeToHome = function () {
    //update route model to hide
    this.settingsModel.set('active', false);
}