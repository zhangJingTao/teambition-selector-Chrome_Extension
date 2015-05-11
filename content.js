chrome.runtime.onMessage.addListener(  function(request, sender, sendResponse) {
	  if (request.cmd== "getDataId"){
		  var lis = document.getElementsByClassName("scrum-stage");
		  var ids = new Array();
		  for(var i=0;i<lis.length;i++){
			  ids.push(lis[i].getAttribute("data-id"));
		  }		  
		  sendResponse(
		  {
			  kws: ids,
			  count: document.getElementsByClassName("scrum-stage").length
		  }); 
	  }
});