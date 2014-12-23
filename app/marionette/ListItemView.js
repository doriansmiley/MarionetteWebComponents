/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ListItemView = Sp.AbstractWebComponentItemView.extend({
    constructor:function(options){
        options.templateRoot = '#listItemComponent';//the root template element of the external web component html
        options.templateUrl = 'partial/ListItemComponent.html';//the location of the web component html
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

Sp.ListItemView.templateData = null;