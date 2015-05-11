chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('get data start');
	alert("开始获取..（release必须在最后一列）");
	try{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
			chrome.tabs.sendMessage(tabs[0].id, {cmd: "getDataId"}, function(response) {    
			console.log(response);
			if(response == undefined) alert("请确认在teambition的任务版页操作");
			var count = response.count;
			var ids = response.kws;
			var url1 = "https://www.teambition.com/api/stages/{ID}/tasks?isDone=false&count=100&page=1&_stageId={ID}&_="+new Date().getTime();
			var url2 = "https://www.teambition.com/api/stages/{ID}/tasks?isDone=true&count=100&page=1&_stageId={ID}&_="+new Date().getTime();
			for(var i=0;i<count;i++){
				var id = ids[i];
				var url = url1.replace(new RegExp(/({ID})/g),id);
				if( i == (count-1)){
					url = url2.replace(new RegExp(/({ID})/g),id);
				}
				setCookie(i,url);
				/*$.ajax({
				   type:"GET",  
				   url:url,
				   dataType:"json",
				   async:false,
				   success:function(data){   //function1()  
					  setCookie(i,JsonArrayToStringCfz(data));  
				   },
				   failure:function (result) {   
					   alert('/(ㄒoㄒ)/~~获取数据失败..');   
				   },  
				});*/
			}
			window.open("popup.html?count="+count);
			}); 
		});
	}catch(e){
		alert("请确认在teambition的任务版页操作"+e);
	}
});

function setCookie(name,value){ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}