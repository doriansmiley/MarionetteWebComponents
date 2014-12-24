/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemCollectionView = Sp.AbstractWebComponentCollectionView.extend({
    constructor:function(options){
        options.templateRoot = '#listItemCollectionComponent';//the root template element of the external web component html
        options.templateUrl = 'partial/ListCollectionComponent.html';//the location of the web component html\
        options.collection = options.injector.inject('ListItemCollection');
        this.onClickProxy = this.onAddBtnClick.bind(this);
        Sp.AbstractWebComponentCollectionView.prototype.constructor.call(this, options);
    },
    id:'itemRegion',
    childView:Sp.ListItemView,
    fetch: function ( options ) {
        this.collection.url = this.options.url;
        this.collection.fetch({
            remove: false,
            success: function(collection, resp){
                this.templateReady = true;
                this.vent.trigger(Sp.AbstractWebComponentViewBase.RENDERED, {
                    view: this
                });
                this.render();
            }.bind(this)
        });
    },
    behaviors:{
        ListItemCollectionViewBehavior:{}
    }
});


Sp.ListItemCollectionView.prototype.addSkinPart = function ( name, element ) {
    switch( name ){
        case 'nameInput':
            this.nameInput = element;
            break;
        case 'dateInput':
            this.dateInput = element;
            break;
        case 'sortIndicator':
            this.sortIndicator = element;
            break;
        case 'addBtn':
            this.addBtn = element;
            this.addBtn.addEventListener('click', this.onClickProxy, false );
            break;
        case 'dob':
            break;
    }
}

Sp.ListItemCollectionView.prototype.onDestroy = function(){
    if( this.addBtn !== null && this.addBtn !== undefined ){
        this.addBtn.removeEventListener('click', this.onClickProxy, false );
    }
    this.addBtn = null;
    Sp.AbstractWebComponentCollectionView.prototype.onDestroy.call(this);
}

Sp.ListItemCollectionView.prototype.onAddBtnClick = function( event ){
    this.collection.add({
        name:this.nameInput.value,
        dob:this.dateInput.value,
        value:Math.random()
    });
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.ListItemCollectionView.prototype.getTemplateData = function(){
    return Sp.ListItemCollectionView.templateData;
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.ListItemCollectionView.prototype.setTemplateData = function( value ){
    return Sp.ListItemCollectionView.templateData = value;
}

Sp.ListItemCollectionView.templateData = null;