/**
 * Created by dsmiley on 12/23/14.
 */
Sp.RegionInitializer = function ( app ) {
    Sp.AbstractInitializer.prototype.constructor.call(this, app);
}

Sp.ObjectUtils.extend(Sp.AbstractInitializer , Sp.RegionInitializer);

Sp.RegionInitializer.prototype.init = function(){
    this.addRegions();
}

Sp.RegionInitializer.prototype.addRegions = function(){
    this.app.addRegions({
        listRegion: '#listRegion'
    });
}