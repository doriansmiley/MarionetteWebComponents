/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ViewInitializer = function (app) {
    if(app === null || app === undefined ){
        throw new Error('Sp.ViewInitializer.constructor: app is required');
    }
    this.app = app;
    this.init();
}

//this function should be overriden is sub class. DEfines the views used in the application
Sp.ViewInitializer.prototype.getViews = function(){
    return [
        {
            view:Sp.ListItemCollectionView,
            show:true,
            options:{
                url:'data/listData.json',//where the views data can be found
                vent:this.app.vent,//event aggregator for this view, here we are using the main app level aggregator, but we could define custom channels or another instance
                base:Backbone.Marionette.CollectionView,//the base class for the view. Because we use mixins base allows us to target the appropriate base class for the instance
                region:this.app.getRegion('listRegion'),
                childViewContainer:'#listItemMain',
                childViewOptions:{
                    vent:this.app.vent,
                    base:Backbone.Marionette.ItemView
                }
            }}
    ];
}

Sp.ViewInitializer.prototype.init = function(){
    this.views = this.getViews();
    for( var i=0; i < this.views.length; i++ ){
        //for each view load the view data
        this.initView( this.views[i] )
    }
}

Sp.ViewInitializer.prototype.initView = function( viewItem ){
    //init the view passing the data
    var view = new viewItem.view( viewItem.options );
    //if we should show the view do it
    if( viewItem.show ){
        view.options.region.show( view );
    }
}

Sp.ViewInitializer.ALL_VIEWS_INITIALIZED = 'Sp.ViewInitializer:initialized';