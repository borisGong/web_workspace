$(function(){
	document.onselectstart = function(event){
	        var targetNode = event.target || event.srcElement;
	        if(targetNode.parentNode.id == 'a' ||targetNode.id == 'a'){
	            alert(targetNode)
	        }
	    }
	$('#editor').mouseup(function () {
		var txt = "";
 //     if (window.getSelection) {
	//         txt = window.getSelection();
	//     } else if (window.document.getSelection) {
	//         txt = window.document.getSelection();
	//     } else if (window.document.selection) {
	//         txt = window.document.selection.createRange().text;
	//     }	
	//     //alert(selectedText);
	// }); 
		
	})
})