/**
 * Created by administrator on 03/03/2017.
 */
function DynamicLinksJsFiles($iframe,scriptUrls){
    try{
        var $iframeHead =  $($iframe[0].contentDocument.getElementsByTagName("head"));
        $iframeHead.append($.map(scriptUrls,function(value ,key){
            return $('<script type="text/javascript" src="'+value+'"/>');
        }));

    }catch(e){
        console.log(e);
    }
}
function DynamicLinksCssFile($iframe,cssUrls) {
    try{
        var $iframeHead =  $($iframe[0].contentDocument.getElementsByTagName("head"));
        $iframeHead.append($.map(cssUrls,function(value ,key){
            return $('<link href="'+value+'" rel="stylesheet" />');
        }));
    }catch(e){
        console.log(e);
    }

}
function setIframeProperties($iframe){
    var $body = $($iframe[0].contentDocument.getElementsByTagName("body"));
    $body.attr("contenteditable",true);
    $body.attr("ondrop","return false;");
}
function setIframeEvent($iframe){
    $($iframe[0].contentDocument.getElementsByTagName("body")).on("keydown",function(e){
        if(e.keyCode==219){
            var convert = $iframe[0].contentWindow.dd();
        }
    });
}
function getCaretPosition(editableDiv) {
    var caretPos = 0, containerEl = null, sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}
function isArray(obj){
    Object.prototype.toString.call(obj) === '[object Array]';
}

function bindEvent(){
    $("#editor").on("keydown",function(e){
        if(e.keyCode==219){
            var offset = getCaretPosition($("#editor"));

            $("#popUp").show();
        }
    });
}

function Main(){
    setIframeProperties($("iframe"));
    DynamicLinksJsFiles($("iframe"),["../jquery-1.10.2.min.js","iframeExtend.js"]);
    setIframeEvent($("iframe"));
    bindEvent();
    getCaretPosition();
}

Main();
