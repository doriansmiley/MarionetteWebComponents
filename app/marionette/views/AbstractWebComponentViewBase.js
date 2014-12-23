/**
 * Created by dsmiley on 12/18/14.
 * IMPORTANT: because Marionette.CollectionView and Marionette.ItemView have different inheritance chains
 * we have to mixin web component functions as instance methods. This object allows us to do that
 */
Sp.AbstractWebComponentViewBase = function( options ){

}

Sp.AbstractWebComponentViewBase.prototype.initialize = function ( options ) {
    if( options.templateRoot === null || options.templateRoot == undefined ){
        throw new Error('Sp.AbstractItemView: options.templateRoot is required');
    }
    if( options.templateUrl === null || options.templateUrl == undefined ){
        throw new Error('Sp.AbstractItemView: options.templateUrl is required');
    }
    this.templateRoot = options.templateRoot;//the root template element of the external web component html
    this.templateUrl = options.templateUrl;//the location of the web component html
    this.vent = options.vent;//find another way to get a handle on the central event bus
    this.base = options.base;//the base class of the component
    this.templateReady = false;
    this.base.prototype.initialize.call(this, options);
}

Sp.AbstractWebComponentViewBase.prototype.mapSkinParts = function ( clone ) {
    var skinParts = clone.querySelectorAll('[data-skin-part]');
    for( var i=0; i < skinParts.length; i++ ){
        this.addSkinPart( skinParts[i].getAttribute('data-skin-part'), skinParts[i] );
    }
}

//stub for override
Sp.AbstractWebComponentViewBase.prototype.addSkinPart = function ( name, element ) {

}


Sp.AbstractWebComponentViewBase.prototype.render = function () {
    //check if the external template is loaded. Child view componentws are inited and rendered by the framework,
    //so it's possible the template has not been loaded
    if(this.template === null || this.template === undefined ){
        this.loadTemplate(this.templateUrl);
        return;
    }
    this.$el.prepend(this.template(this.model));
    var template = this.el.querySelector(this.templateRoot);
    var clone = document.importNode(template.content, true);
    this.mapSkinParts( clone );
    //is the host component specifies a child view use it else use host
    if( this.childViewContainer !== null && this.childViewContainer !== undefined ){
        this.childViewContainer.appendChild(clone);
    }else{
        //IMPORTANT: if host is null we need to create a shadow root using the element
        this.host.appendChild(clone);
    }

    this.base.prototype.render.call(this);
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.AbstractWebComponentViewBase.prototype.getTemplateData = function(){
    return Sp.AbstractWebComponentViewBase.templateData;
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.AbstractWebComponentViewBase.prototype.setTemplateData = function( value ){
    return Sp.AbstractWebComponentViewBase.templateData = value;
}

Sp.AbstractWebComponentViewBase.prototype.ready = function(){
    if( this.fetch !== null && this.fetch !== undefined ){
        this.fetch();
    }else{
        this.render();
    }
}

Sp.AbstractWebComponentViewBase.prototype.loadTemplate = function (url) {
    //if the template data has already been loaded render from the cache
    if( this.getTemplateData() !== null ){
        this.template = _.template( this.getTemplateData() );
        this.ready();
        return;
    }
    //could optionally use a service here to provide abstraction as to the service implementation
    return $.ajax(
        {
            url: url,
            success: function (data, status, xhr) {
                this.setTemplateData( data );
                this.template = _.template(data);
                this.ready();
            }.bind(this),
            dataType: 'html',
            error: function (xhr, status, error) {
                console.log(error.message);
            }.bind(this)
        }
    )
}

Sp.AbstractWebComponentViewBase.prototype.onDestroy = function(){
    // custom destroying and cleanup goes here
    this.shadowDom = null;
    this.templateRoot = null;
    this.templateUrl = null;
    this.vent = null;
}

Sp.AbstractWebComponentViewBase.RENDERED = 'AbstractItemView:rendered';
Sp.AbstractWebComponentViewBase.templateData = null;