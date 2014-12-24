/**
 * Created by dsmiley on 12/23/14.
 */
Sp.BehaviorInitializer = function ( app ) {
    this.behaviors = {};
    Sp.AbstractInitializer.prototype.constructor.call(this, app);
}

Sp.ObjectUtils.extend(Sp.AbstractInitializer , Sp.BehaviorInitializer);

Sp.BehaviorInitializer.prototype.init = function(){
    Marionette.Behaviors.behaviorsLookup = this.getBehaviors();
}

Sp.BehaviorInitializer.prototype.getBehaviors = function(){
    return{
        ListItemCollectionViewBehavior:Sp.ListItemCollectionViewBehavior
    };
}