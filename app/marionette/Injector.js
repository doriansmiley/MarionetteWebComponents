/**
 * Created by dsmiley on 12/23/14.
 */
Sp.Injector = function(){
//Note: this could be improved by creating read only accessor methods for objectMap
    this.objectMap = {};
}
Sp.Injector.prototype.mapObject = function(key, constructor, useSingleton){
    if( key === null || key === undefined || key.length <= 0 || typeof key !== 'string' ){
        throw new Error('Sp.Injector.prototype.mapObject: key must be a string with a length greater than 0');
    }
    if( constructor === null || constructor === undefined || typeof constructor !== 'function' ){
        throw new Error('Sp.Injector.prototype.mapObject: constructor must be a function');
    }
    if( useSingleton === null || useSingleton === undefined ){
        useSingleton = false;
    }
//instantiate singleton instance upon request is more efficient
    this.objectMap[key] = {constructor:constructor, useSingleton:useSingleton, instance:null };
}
Sp.Injector.prototype.mapSingletonInstance = function( key, instance ){
    if( key === null || key === undefined || key.length <= 0 || typeof key !== 'string' ){
        throw new Error('Sp.Injector.prototype.mapSingletonInstance: key must be a string with a length greater than 0');
    }
    if( instance === null || instance === undefined ){
        throw new Error('Sp.Injector.prototype.mapSingletonInstance: instance must be defined');
    }
//map injector as sigleton using the supplied instance
//this method is very useful for mapping objects that are themselves singletons and may have already been constructed
//prime example is the model wich generally is constructed before injections are defined
    this.objectMap[key] = {constructor:null, useSingleton:true, instance:instance };
}
Sp.Injector.prototype.inject = function(key){
    if( this.objectMap[key] !== null && this.objectMap[key] !== undefined ){
        if( this.objectMap[key].useSingleton ){
            if( this.objectMap[key].instance === null ){
                this.objectMap[key].instance = new this.objectMap[key].constructor();
            }
            return this.objectMap[key].instance;
        }else{
            return new this.objectMap[key].constructor();
        }
    }
    throw new Error('Sp.Injector.prototype.getObject: could not find object for key: ' + key);
}
