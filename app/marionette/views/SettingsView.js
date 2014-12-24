/**
 * Created by dsmiley on 12/23/14.
 */
Sp.SettingsView = Sp.AbstractWebComponentItemView.extend({
    constructor:function(options){
        options.templateRoot = '#settingsComponent';//the root template element of the external web component html
        options.templateUrl = 'partial/SettingsComponent.html';//the location of the web component html
        this.showBtnProxy = this.onShowButtonClick.bind(this);
        this.model = options.injector.inject('SettingsModel');
        this.showBtn = null;
        this.backgroundColorInput = null;
        this.backgroundColorLabel = null;
        Sp.AbstractWebComponentItemView.prototype.constructor.call(this, options);
    },
    initialize: function (options) {
        this.setUpBindings();
        Sp.AbstractWebComponentItemView.prototype.initialize.call(this, options);
    }
});

Sp.SettingsView.prototype.setUpBindings = function ( value ) {
    //attach event listener for activation and background color change
    this.listenTo(this.model, 'change:active', this.setActive.bind(this));
    this.listenTo(this.model, 'change:backgroundColor', this.setBackgroundColor.bind(this));
    //set initial values
    this.setActive(this.model.get('active'));
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.SettingsView.prototype.getTemplateData = function(){
    return Sp.SettingsView.templateData;
}

//IMPORTANT: sub classes must override this method. It's designed to cache template data but will need to point to a different static property defined by the subclass
Sp.SettingsView.prototype.setTemplateData = function( value ){
    return Sp.SettingsView.templateData = value;
}

Sp.SettingsView.prototype.addSkinPart = function ( name, element ) {
    switch( name ){
        case 'showBtn':
            this.showBtn = element;
            this.showBtn.addEventListener('click', this.showBtnProxy, false );
            this.setActive(this.model.get('active'));
            break;
        case 'backgroundColorInput':
            this.backgroundColorInput = element;
            this.setActive(this.model.get('active'));
            break;
        case 'backgroundColorLabel':
            this.backgroundColorLabel = element;
            this.setBackgroundColor(this.model.get('active'));
            this.setActive(this.model.get('active'));
            break;
    }
}

Sp.SettingsView.prototype.setActive = function ( value ) {
    if( this.backgroundColorInput ){
        this.backgroundColorInput.style.visibility = ( this.model.active ) ? 'visible' : 'hidden';
    }
    if( this.backgroundColorLabel ){
        this.backgroundColorLabel.style.visibility = ( this.model.active ) ? 'visible' : 'hidden';
    }
    if( this.showBtn ){
        this.showBtn.innerHTML = ( value ) ? 'Show Settings' : 'Hide Settings';
    }
}

Sp.SettingsView.prototype.setBackgroundColor = function ( event, value ) {
    //avoid recursion
    if( !this.backgroundColorInput || value == this.backgroundColorInput.value ){
        return;
    }
    this.backgroundColorInput.value = value;
}

Sp.SettingsView.prototype.onShowButtonClick = function ( event ) {
    //route to settings view
    console.log('Sp.SettingsView.prototype.onShowButtonClick');

}

Sp.SettingsView.prototype.onDestroy = function(){
    if( this.showBtn !== null && this.showBtn !== undefined ){
        this.showBtn.removeEventListener('click', this.showBtnProxy, false );
    }
    this.showBtnProxy = null;
    this.model = null;
    this.showBtn = null;
    this.backgroundColorInput = null;
    this.backgroundColorLabel = null;
    Sp.AbstractWebComponentViewBase.prototype.onDestroy.call(this);
}

Sp.SettingsView.templateData = null;