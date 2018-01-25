function begin_fly() {
    var $items = $(".item");
    var $texts = $(".item").find("div");
    $items.each(function (index, value, array) {
        var $box = $(this);
        var $text = $box.find("div");
        var delayTime = 4000;
        var left = (Math.round(Math.random() * -800) + 400) + 'px';
        var top = (Math.round(Math.random() * -800) + 400) + 'px';

        $box.css({
            "top": 0,
            "left": 0
        });

        $text.css({
            "opacity": 0,
            "font-size": 0
        });

        if (!$box.is(":animated")) {
            $box.animate(
                {
                    left: left,
                    top: top,
                }, 4000);
        } else {
            $text.delay(delayTime).animate(
                {
                    opacity: '1',
                    fontSize: '400%'
                }, 4000, begin_fly)
        }
    })
}

begin_fly();
