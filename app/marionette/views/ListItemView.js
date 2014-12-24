/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemView = Sp.AbstractWebComponentItemView.extend({
    constructor:function(options){
        options.templateRoot = '#listItemComponent';//the root template element of the external web component html
        options.templateUrl = 'partial/ListItemComponent.html';//the location of the web component html
        this.nameProxy = this.onNameClick.bind(this);
        Sp.AbstractWebComponentItemView.prototype.constructor.call(this, options);
    },
    model:Sp.ListItemModel
});

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.ListItemView.prototype.getTemplateData = function(){
    return Sp.ListItemView.templateData;
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.ListItemView.prototype.setTemplateData = function( value ){
    return Sp.ListItemView.templateData = value;
}

Sp.ListItemView.prototype.addSkinPart = function ( name, element ) {
    switch( name ){
        case 'list':
            break;
        case 'name':
            this.name = element;
            this.name.addEventListener('click', this.nameProxy, false );
            break;
        case 'value':
            break;
        case 'dob':
            break;
    }
}

Sp.ListItemView.prototype.onNameClick = function ( event ) {
    alert('my name is: ' + this.model.get('name'));
    console.log(this.model.get('name'));
}

Sp.AbstractWebComponentViewBase.prototype.onDestroy = function(){
    if( this.name !== null && this.name !== undefined ){
        this.name.removeEventListener('click', this.nameProxy, false );
    }
    this.name = null;
    this.nameProxy = null;
    Sp.AbstractWebComponentViewBase.prototype.onDestroy.call(this);
}

Sp.ListItemView.templateData = null;