var AnchorManager = (function(){
    return {
        insert:function(){
            var range = cursorManager.getCursorRange();
            $(".anchor").remove();
            range.insertNode($('<span class="anchor"></span>')[0]);
        }
    }
})();

var cursorManager  = (function(){
    var lastCursonRange;
    return {
        getCursorRange:function(){
            var range,selection = window.getSelection();
            if(selection.type="Caret"){
                var range = selection.getRangeAt(0);
                cursorManager.cacheCursorRange(range);
                return range;
            }
        },
        getCharsBeforeCursor:function(content,count){
            var range,selection = window.getSelection();
            if(selection.type="Caret"){
                var range = selection.getRangeAt(0);
                var offset = range.endOffset;
                return content.substring(offset-2,offset-1);
            }
        },
        cacheCursorRange:function(range){
             lastCursonRange = range;
        },
        recoverCursorRange:function(){
            window.getSelection().addRange(lastCursonRange);
        }
    }
})();

var popUpManager = (function(){
    return {
        init:function(data){
            $(".item").remove();
            for(var i = 0 ; i < data.length ; i++){
                var $item = $("<div class='item' style='background-color: #cbeeff;border: 1px solid white'>"+data[i]+"</div>");
                $(".popup").append($item);
            }
        },
        show:function(offset){
            popUpManager.init(["andy","boris","jay","alex"]);
            $(".popup").css({
                left:offset.left + 40,
                top:offset.top + 50,
                opacity:1,
                index:1000
            });
        },
        hide:function(){
            $(".popup").css({
                opacity:0,
            });
        }
    }
})();

var rangeManager =(function ( ){
        var cacheLastRange ;
        return {
            cacheLastRange:function(){
                var selection = window.getSelection();
                cacheLastRange = selection;
            },
            setLastRange:function(){
                window.getSelection().addRange(cacheLastRange);
            }
        }
})();

var stringManager = (function(){
    var cacheString = "";
    return {
        setCacheString:function(keyString,cacheCount){

        },
        getCacheString:function(){
            return cacheString;
        },
        clearCacheString:function(){
            cacheString = "";
        }
    }
})();

var EventManager = (function(){
    function insertAnchor(){};
    function showPopUp(){
        if(cacheKeyCount.recourdcacheKeyCodeCount(e.keyCode,219) == 2){
            var offset = $(".anchor").offset();
            popUp.show({
                top:offset.top,
                left:offset.left
            },[
                "viky","boris","Join","miku"
            ])
        }
    };
    function insertTextToCursor(){
        var selection = window.getSelection();
        if(selection.type="Caret"){
            var range = selection.getRangeAt(0);
            cacheKeyCount
            range.insertNode(e.target);
        }
    }

    $('.editor').bind('click', function(e) {
        AnchorManager.insert();
    });
    $('.editor').bind('keyup',function(e){
        if(e.keyCode==219){
            if("["==cursorManager.getCharsBeforeCursor($(".editor").html(),2)){
                popUpManager.show($(".anchor").offset());
            }
        }
    });
    $("body").on({
        click:function(e){
            insertTextToCursor
        }
    },$(".item"))

})();
