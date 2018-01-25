/**
 * Created by administrator on 13/12/2016.
 */
(function(){
    $("#areYouSure").on("click",function(){
        $("#audioPlayer").attr("src",$("#fileName").text()).mediaelementplayer();
    });
})