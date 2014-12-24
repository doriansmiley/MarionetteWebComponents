/**
 * Created by dsmiley on 12/23/14.
 */
Sp.AbstractCollectionViewBehavior = function (options, view) {
    Sp.AbstractBindingBehavior.prototype.constructor.call(this, options, view);
}

Sp.ObjectUtils.extend( Sp.AbstractBindingBehavior,  Sp.AbstractCollectionViewBehavior);

//stub for override
Sp.AbstractCollectionViewBehavior.prototype.getCollectionEvents = function () {
    return {
        add:this.onAdd,
        remove:this.onRemove,
        reset:this.onReset,
        sort:this.onSort,
        destroy:this.onDestroy,
        request:this.onRequest,
        sync:this.onSync,
        error:this.onError
    };
}

Sp.AbstractCollectionViewBehavior.prototype.onAdd = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onAdd: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onRemove = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onRemove: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onReset = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onReset: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onSort = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onSort: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onDestroy = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onDestroy: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onRequest = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onRequest: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onSync = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onSync: ');
    console.log(arguments);
}

Sp.AbstractCollectionViewBehavior.prototype.onError = function ( event ) {
    console.log('Sp.AbstractCollectionViewBehavior.prototype.onSync: ');
    console.log(arguments);
}