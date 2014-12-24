/**
 * Created by dsmiley on 12/23/14.
 */
Sp.InjectorInitializer = function ( app ) {
    Sp.AbstractInitializer.prototype.constructor.call(this, app);
}

Sp.ObjectUtils.extend(Sp.AbstractInitializer , Sp.InjectorInitializer);

Sp.InjectorInitializer.prototype.init = function(){
    this.addInitializer();
}

Sp.InjectorInitializer.prototype.addInitializer = function(){
    this.app.injector = new Sp.Injector();
    this.app.injector.mapSingletonInstance('ListItemCollection', new Sp.ListItemCollection());
    this.app.injector.mapSingletonInstance('SettingsModel', new Sp.SettingsModel());
    this.app.injector.mapSingletonInstance('EventDispatcher', this.app.vent);
    this.app.injector.mapSingletonInstance('Service',{});//sample, add concrete service here
    this.app.injector.mapSingletonInstance('Router',new Sp.Router({injector:this.app.injector}));//sample, add concrete service here
}