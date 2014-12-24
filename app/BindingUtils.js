/**
 * Created by dsmiley on 12/24/14.
 */
Sp.Observer = function() {
    this.chain;
    this.Update = function () {
        return;
    }
}
Sp.Binder = function() {
    this.bindingGroups = {};
}
Sp.Binder.prototype.bind = function(host, hostProp, chain, chainProp, isCSS, cssProperty, group){
    var changeWatcher = Sp.BindingUtils.bind(host, hostProp, chain, chainProp, isCSS, cssProperty);
    var groupToBind = group || "default";
    if (!this.bindingGroups.hasOwnProperty(groupToBind)){
        this.bindingGroups[groupToBind] = [];
    }
    this.bindingGroups[groupToBind].push({host : host, watcher : changeWatcher});
}
Sp.Binder.prototype.unbind = function(group){
    var groupToUnbind = group || "default";
    var bindings = this.bindingGroups[groupToUnbind];
    if (bindings){
        bindings.forEach(function (bindingData){
            bindingData.host.RemoveObserver(bindingData.watcher);
        });
        delete this.bindingGroups[groupToUnbind];
    }
}
Sp.Binder.prototype.unbindAll = function(){
    for (var group in this.bindingGroups){
        this.unbind(group);
    }
}
Sp.Subject = function() {
    this.observerHash = {};
    this.observable = true;
    this.binder = new Sp.Binder();
}
Sp.Subject.prototype.getCss = function( useSvg, preserveNonMatchingAttributes ){
    if( useSvg === null || useSvg === undefined ){
        useSvg = false;
    }
    if( preserveNonMatchingAttributes === null || preserveNonMatchingAttributes === undefined ){
        preserveNonMatchingAttributes = false;
    }
    var returnCss = Sp.CSSUtils.getObjectCss( this, useSvg, preserveNonMatchingAttributes );
    return returnCss;
}
Sp.Subject.prototype.Notify = function (value, chain) {
    if (this.observerHash[chain] == null || this.observerHash[chain] == undefined) {
//property is not bound
        return;
    }
    var m_count = this.observerHash[chain].length;
    for (var i = 0; i < m_count; i++) {
        this.observerHash[chain][i].Update(value, chain);
    }
}
Sp.Subject.prototype.AddObserver = function (observer) {
    if (!observer.Update || !observer.chain) {
        throw 'Wrong parameter';
    }
    if (this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
        this.observerHash[observer.chain] = [];
    }
    this.observerHash[observer.chain].push(observer);
}
Sp.Subject.prototype.RemoveObserver = function (observer) {
    if (!observer.Update || !observer.chain)
        throw 'Wrong parameter';
    if (this.observerHash[observer.chain] == null || this.observerHash[observer.chain] == undefined) {
        throw 'Sp.Subject.prototype.RemoveObserver: Property not found in registered observers';
    }

    var m_count = this.observerHash[observer.chain].length;
    for (var i = 0; i < m_count; i++) {
        if( this.observerHash[observer.chain][i] == observer ){
            if (m_count > 0 && i > -1 && i < this.observerHash[observer.chain].length) {
                switch (i) {
                    case 0:
                        this.observerHash[observer.chain].shift();
                        break;
                    case m_count - 1:
                        this.observerHash[observer.chain].pop();
                        break;
                    default:
                        var head = this.observerHash[observer.chain].slice(0, i);
                        var tail = this.observerHash[observer.chain].slice(i + 1);
                        this.observerHash[observer.chain] = head.concat(tail);
                        break;
                }
            }
            return;
        }
    }

}
/**
 * A generic way to define a getter/setter for objects in both the legacy
 * Mozilla way and the new ECMA standard way, which should work in I.E. with DOM
 * Elements, but not js objects.
 *
 * more info on javascript getters and setters: John Resig:
 * http://bit.ly/resig-js-gs-2007 Robert Nyman: http://bit.ly/nyman-js-gs-2009
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 * @param {string}
 * label The property name to get/set.
 * @param {function}
 * getter The get function.
 * @param {function}
 * setter The set function.
 */
Sp.Subject.prototype.addProperty = function (label, getter, setter) {
    if (Object.defineProperty) {
        try {
            Object.defineProperty(
                this,
                label,
                {
                    get: getter,
                    set: setter,
// Properties have to be enumerable otherwise they will be skipped during
// for-in loop (which causes problems in CopyUtils)
                    enumerable: true
                }
            );
        }
        catch (e) {
// IE8 Bullshit implementation of Object.defineProperty
        }
    }
    else if (this.__defineGetter__) {
        if (getter) {
            this.__defineGetter__(label, getter);
        }
        if (setter) {
            this.__defineSetter__(label, setter);
        }
    }
};
/**
 * A generic way to define a group of getters/setters for objects
 *
 * @author somethingkindawierd@gmail.com (Jon Beebe)
 * @param {object}
 * p Set of properties and their getter/setter methods.
 */
Sp.Subject.prototype.addProperties = function (p) {
    for (var label in p) {
        if (p.hasOwnProperty(label)) {
            this.addProperty(label, p[label].get, p[label].set);
        }
    }
};
Sp.ChangeWatcher = function(hostProp, chainInstance, chainPropToWatch, isCSS, cssProperty ) {
// inherits( new Sp.Observer( hostProp ), this );
    this.chain = hostProp;
    this.instance = chainInstance;
    this.chainProp = chainPropToWatch;
    this.isCSS = isCSS;
    this.cssProperty = cssProperty;
    this.Update = function (value, chain ) {
        if( this.isCSS ){
            this.instance[ this.chainProp ](this.cssProperty, value );
        }
        else if (typeof( this.instance[ this.chainProp ] ) == "function") {
            this.instance[ this.chainProp ](value, chain );
        }
        else {
            if( this.instance[ this.chainProp ] != value ){
                this.instance[ this.chainProp ] = value;
            }
        }
    }
};
Sp.ChangeWatcher.prototype = new Sp.Observer();
Sp.BindingUtils = function() {
}
Sp.BindingUtils.bind = function (host, hostProp, chain, chainProp, isCSS, cssProperty) {
    if( isCSS === undefined || isCSS === null ){
        isCSS = false;
    }
    var changeWatcher = new Sp.ChangeWatcher(hostProp, chain, chainProp, isCSS, cssProperty);
    host.AddObserver(changeWatcher);
    return changeWatcher;
}