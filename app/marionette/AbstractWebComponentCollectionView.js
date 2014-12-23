/**
 * Created by dsmiley on 12/18/14.
 */
Sp.AbstractWebComponentCollectionView = Backbone.Marionette.CollectionView.extend({
    initialize: function (options) {
        this.host = null;
        Backbone.Marionette.CollectionView.prototype.constructor.call(this, options);
    }
});

Sp.ObjectUtils.mixinToObject( Sp.AbstractWebComponentViewBase, Sp.AbstractWebComponentCollectionView );

Sp.AbstractWebComponentCollectionView.prototype.render = function () {

    if(this.template === null || this.template === undefined ){
        this.loadTemplate(this.templateUrl);
        return;
    }

    this.$el.prepend(this.template(this.model));
    //this is where the magic happens. We set up the shadow root and store a reference to the host root.
    //from now on if you add children to this.el they will not be visible in the DOM
    this.host = this.el.createShadowRoot();
    var template = this.el.querySelector(this.templateRoot);
    var clone = document.importNode(template.content, true);
    this.host.appendChild(clone);

    Backbone.Marionette.CollectionView.prototype.render.call(this);
}

Sp.AbstractWebComponentCollectionView.prototype.attachHtml = function ( collectionView, childView, index ) {
    childView.host = this.host;//let the child view know where the host root is
    Backbone.Marionette.CollectionView.prototype.attachHtml.call( this, collectionView, childView, index );
}

Sp.AbstractWebComponentCollectionView.prototype.attachBuffer = function ( collectionView, buffer ) {
    this.host.appendChild(buffer);
}
