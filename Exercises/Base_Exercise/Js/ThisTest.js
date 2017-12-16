function Parent(){

}
Parent.prototype.talent = "music";
Parent.prototype.getTalent = function(){
    console.log(this.talent);
}
Parent.prototype.setTalent = function(talent){
    this.talent = talent;
}

function Son(){

}
Son.prototype = new Parent();

var p1 = new Parent();
p1.getTalent();


var s1 = new Son();
s1.setTalent("run");
s1.getTalent();