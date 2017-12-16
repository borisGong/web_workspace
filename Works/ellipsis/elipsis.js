/**
 * Created by administrator on 05/08/2016.
 */
function ellipsisString(count) {
    var $ellipsis = null, $parent = null;
    if (typeof (count) != 'undefined' && count != 0) {
        var waitLoaded = setInterval(function () {
            $ellipsis = $(".cc-ellipsis");
            if (count == $ellipsis.length) {
                callDotDotDot($ellipsis);
                clearInterval(waitLoaded);
            }
        }, 10)
    } else {
        $ellipsis = $(".cc-ellipsis"), $parent = $ellipsis.closest(".ng-hide");
        var waitShow = setInterval(function () {
            if ($parent.css("display") != "none") {
                callDotDotDot($ellipsis);
                clearInterval(waitShow);
            }
        }, 10)
    }
    function callDotDotDot($ellipsis) {
        $ellipsis.dotdotdot({
            ellipsis: '... ',
            height: 60
        });
    }
}

