/**
 * Created by dsmiley on 12/24/14.
 */
Sp.RouteInitializer = function (app) {
    Sp.AbstractInitializer.prototype.constructor.call(this, app);
}

Sp.RouteInitializer.prototype.init = function(){
    this.initRouter();
}

Sp.RouteInitializer.prototype.initRouter = function(){
    //set up routes
    var router = this.app.injector.inject('Router');
    router.appRoute("settings", "routeToSettings");
    router.appRoute("home", "routeToHome");
    Backbone.history.start();
}