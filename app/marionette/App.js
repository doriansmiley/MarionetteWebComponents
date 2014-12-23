$(function () {
//create app
    var app = new Backbone.Marionette.Application();

//set up regions. explore delegation
    app.addRegions({
        listRegion: '#listRegion'
    });

    _.templateSettings.variable = "sp";

//set up channels

//set up commands

//set up request response

//set up views
    var viewInitializer = new Sp.ViewInitializer(app);

     app.vent.on(Sp.ViewInitializer.ALL_VIEWS_INITIALIZED, function( event ){
     var options={};
     app.start( options );
     })
//{view:Sp.ListItemCollectionView, url:'data/listData.json', dataType:'json', region:this.app.getRegion('listRegion'), show:true, options:{}}
//this.app.getRegion('listRegion').show( new Sp.ListItemCollectionView() );
    //new Sp.ListItemCollectionView({});
});
