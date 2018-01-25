function test() {
    $("body").on("click", "#container", function (e) {
        alert("outer"); 
    })

    $("body").on("click", "#content", function (e) {
        alert("Inner");
        e.stopPropagation()
    }) 
}
window.onload = test();