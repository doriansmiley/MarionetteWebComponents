/**
 * Created by dsmiley on 12/18/14.
 */
Sp.ViewInitializer = function (app) {
    Sp.AbstractInitializer.prototype.constructor.call(this, app);
}

Sp.ObjectUtils.extend(Sp.AbstractInitializer , Sp.ViewInitializer);

//this function should be overriden is sub class. DEfines the views used in the application
Sp.ViewInitializer.prototype.getViews = function(){
    return [
        {
            view:Sp.ListItemCollectionView,
            show:true,
            options:{
                url:'data/listData.json',//where the views data can be found
                injector:this.app.injector,//event aggregator for this view, here we are using the main app level aggregator, but we could define custom channels or another instance
                base:Backbone.Marionette.CollectionView,//the base class for the view. Because we use mixins base allows us to target the appropriate base class for the instance
                region:this.app.getRegion('listRegion'),
                childViewContainer:'#listItemMain',
                childViewOptions:{
                    injector:this.app.injector,
                    base:Backbone.Marionette.ItemView
                }
            }
        },
        {
            view:Sp.SortButtonView,
            show:true,
            options:{
                injector:this.app.injector,//event aggregator for this view, here we are using the main app level aggregator, but we could define custom channels or another instance
                base:Backbone.Marionette.ItemView,//the base class for the view. Because we use mixins base allows us to target the appropriate base class for the instance
                region:this.app.getRegion('sortButtonRegion')
            }
        }
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