/**
 * Created by dsmiley on 12/23/14.
 */
Sp.AbstractInitializer = function(app){
    if(app === null || app === undefined ){
        throw new Error('Sp.AbstractInitializer.constructor: app is required');
    }
    this.app = app;
}

//stub for override, subclasses must override this function
Sp.AbstractInitializer.prototype.init = function () {

}