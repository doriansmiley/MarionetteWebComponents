/**
 * Created by dsmiley on 12/23/14.
 * Example showing view resolution of component using data binding
 */
Sp.ListItemCollectionViewBehavior = function (options, view) {
    Sp.AbstractCollectionViewBehavior.prototype.constructor.call(this, options, view);
}

Sp.ObjectUtils.extend( Sp.AbstractCollectionViewBehavior,  Sp.ListItemCollectionViewBehavior);

Sp.ListItemCollectionViewBehavior.prototype.onRender = function ( event ) {
    console.log('Sp.ListItemCollectionViewBehavior.prototype.onSort: ');
    console.log(arguments);
    var listItemCollection = this.view.injector.inject('ListItemCollection');
    this.view.sortIndicator.innerHTML = (listItemCollection.sortType === 'name' ) ? 'sorting by name' : 'sorting by date of birth';
}
