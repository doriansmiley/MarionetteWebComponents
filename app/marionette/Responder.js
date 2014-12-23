/**
 * Created by dsmiley on 12/18/14.
 * This calss is designed to support parallel async calls using the same callback
 * By passing back the params the the result handler of the responding class can determine which request failed and what managed instance is effected
 * A que is a much better solution but I am short on time
 */
Sp.Responder = function( params ){
    this.params = params;
    this.onSuccess = params.success;
    this.onFail = params.fail;
    this.onAlways = params.always;
}

Sp.Responder.prototype.execute = function (){
    var successHandler = this.success.bind(this);
    var failureHandler = this.fail.bind(this);
    var alwaysHandler = this.always.bind(this);
    $.ajax({
        url:this.params.url,
        dataType:this.params.dataType,
        success:successHandler,
        error:failureHandler
    })
}

Sp.Responder.prototype.success = function ( data, textStatus, jqXHR ) {
    this.onSuccess( { responder:this, data:data, textStatus:textStatus, jqXHR:jqXHR } );
}

Sp.Responder.prototype.fail = function (  jqXHR, textStatus, errorThrown ) {
    this.onFail( { responder:this, jqXHR:jqXHR, textStatus:textStatus, errorThrown:errorThrown } );
}

Sp.Responder.prototype.always = function ( data, textStatus, jqXHR ) {
    this.onAlways( { responder:this, data:data, textStatus:textStatus, jqXHR:jqXHR } );
}