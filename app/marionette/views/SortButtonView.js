/**
 * Created by dsmiley on 12/23/14.
 */
Sp.SortButtonView = Sp.AbstractWebComponentItemView.extend({
    constructor:function(options){
        options.templateRoot = '#sortButtonComponent';//the root template element of the external web component html
        options.templateUrl = 'partial/SortButtonComponent.html';//the location of the web component html
        this.sortBtnProxy = this.onSortButtonClick.bind(this);
        this.binder = new Sp.Binder();
        this.listItemCollection = options.injector.inject('ListItemCollection');
        Sp.AbstractWebComponentItemView.prototype.constructor.call(this, options);
    }
});

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.SortButtonView.prototype.getTemplateData = function(){
    return Sp.SortButtonView.templateData;
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.SortButtonView.prototype.setTemplateData = function( value ){
    return Sp.SortButtonView.templateData = value;
}

Sp.SortButtonView.prototype.addSkinPart = function ( name, element ) {
    switch( name ){
        case 'sortBtn':
            this.sortBtn = element;
            this.sortBtn.addEventListener('click', this.sortBtnProxy, false );
            this.setButtonLabel();
            break;
        case 'sortValue':
            this.sortValue = element;
            this.binder.bind(this.listItemCollection, 'sortType', this, 'setSortValue')
            break;
    }
}

Sp.SortButtonView.prototype.setSortValue = function ( value ) {
    this.sortValue.innerHTML = value;
}

Sp.SortButtonView.prototype.setButtonLabel = function () {
    this.sortBtn.innerHTML = ( this.listItemCollection.sortType == 'name' ) ? 'Sort By DOB' : 'Sort By Name';
}

Sp.SortButtonView.prototype.onSortButtonClick = function ( event ) {
    this.listItemCollection.sortType = ( this.listItemCollection.sortType == 'name' ) ? 'dob': 'name';
    this.setButtonLabel();
}

Sp.SortButtonView.prototype.onDestroy = function(){
    if( this.sortBtn !== null && this.sortBtn !== undefined ){
        this.sortBtn.removeEventListener('click', this.sortBtnProxy, false );
    }
    this.binder = null;
    this.listItemCollection = null;
    Sp.AbstractWebComponentViewBase.prototype.onDestroy.call(this);
}

Sp.SortButtonView.templateData = null;