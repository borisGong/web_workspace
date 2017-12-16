function commonMethod() {
    this.Status;
    this.SetStatus = function (s) {
        this.Status = s;
    };
    this.GetStatus = function(){
        return console.log(this.Status);
    }
}

$$page('ra.cp.exportSettings.veo', {
    _create: function () {

    },
    veo:function(){ 
        veo.GetStatus();
    }

})
$$page('ra.cp.exportSettings.nna', {
    _create: function () {

    },
    nna:function(){
        nna.SetStatus("nna");
        nna.GetStatus();
    }
})

$$page.ra_cp_exportSettings_nna.prototype = new commonMethod();
$$page.ra_cp_exportSettings_veo.prototype = new commonMethod();

var nna = new $$page.ra_cp_exportSettings_nna();
var veo = new $$page.ra_cp_exportSettings_nna();