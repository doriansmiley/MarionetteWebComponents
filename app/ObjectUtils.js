/**
 * Created by dsmiley on 12/17/14.
 */
Sp.ObjectUtils = function(){

}

Sp.ObjectUtils.extend = function (base, sub) {
    // Avoid instantiating the base class just to setup inheritance
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    sub.prototype = Object.create(base.prototype);
    // Remember the constructor property was set wrong, let's fix it
    sub.prototype.constructor = sub;
}

Sp.ObjectUtils.mixinToInstnace = function(base, sub, subInstance, overwriteInstanceVariables) {
    if( overwriteInstanceVariables === null || overwriteInstanceVariables === undefined ){
        overwriteInstanceVariables = false;
    }
    var objectToExtend = new base();
    //Grab methods and properties defined through prototypal inheritance
    for (var prop in base.prototype) {
        if (base.prototype.hasOwnProperty(prop)) {
            sub.prototype[prop] = base.prototype[prop];
        }
    }
    //grab instance variables and function
    for (var prop in objectToExtend) {
        if (objectToExtend.hasOwnProperty(prop)) {
            //if an object defines an instance variable or function we don't want to overwrite it unless specified
            if( subInstance[prop] !== null && subInstance[prop] !== undefined && !overwriteInstanceVariables ){
                continue;
            }
            subInstance[prop] = objectToExtend[prop];
        }
    }
    return subInstance;
}

Sp.ObjectUtils.mixinToObject = function(base, sub ) {
    //Grab methods and properties
    for (var prop in base ) {
        if (base.hasOwnProperty(prop)) {
            sub[prop] = base[prop];
        }
    }

    //Grab methods and properties defined through prototypal inheritance
    for (var prop in base.prototype) {
        if (base.prototype.hasOwnProperty(prop)) {
            sub.prototype[prop] = base.prototype[prop];
        }
    }

    return sub;
}