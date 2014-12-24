/**
 * Created by dsmiley on 12/23/14.
 * Example showing view resolution of component using data binding
 */
Sp.ListItemCollectionViewBehavior = function (options, view) {
    Sp.AbstractCollectionViewBehavior.prototype.constructor.call(this, options, view);
}

Sp.ObjectUtils.extend( Sp.AbstractCollectionViewBehavior,  Sp.ListItemCollectionViewBehavior);

Sp.ListItemCollectionViewBehavior.prototype.onSort = function ( event ) {
    console.log('Sp.ListItemCollectionViewBehavior.prototype.onSort: ');
    console.log(arguments);
    //enhance to check the value, if true assign sortByDob if not assign null
    this.view.sortIndicator.innerHTML = 'sorting by date of birth';
}
