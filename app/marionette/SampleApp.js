/**
 * Created by dsmiley on 12/23/14.
 * This class demonstrates how to use delegation to perform application start up.
 * Sub classes on Sp.SampleApp can override prototype methods to change application behavior
 * For example what views are included. This can be especially helpful for hybrid apps that need different view for mobile
 * It can also be helpful to include different subclasses to handle application behavior based on the results of feature tests
 */
Sp.SampleApp = Backbone.Marionette.Application.extend({

});

Sp.SampleApp.prototype.init = function () {
    this.initSettings();
    this.initRegions();
    this.initEventBus();
    this.initRequestResponse();
    this.initCommands();
    this.initViews();
}

Sp.SampleApp.prototype.initSettings = function () {
    _.templateSettings.variable = "sp";
}

Sp.SampleApp.prototype.initRegions = function () {
    this.regionInitializer = new Sp.RegionInitializer(this);
}

Sp.SampleApp.prototype.initEventBus = function () {

}

Sp.SampleApp.prototype.initRequestResponse = function () {

}

Sp.SampleApp.prototype.initCommands = function () {

}

Sp.SampleApp.prototype.initViews = function () {
    this.viewInitializer = new Sp.ViewInitializer(this);

    this.vent.on(Sp.ViewInitializer.ALL_VIEWS_INITIALIZED, function( event ){
        var options={};
        this.start( options );
    })
}