$(document).ready(function(){
	var count = getQueryString("count");
	var baseHtml = "";
	for(var i=0;i<count;i++){
		var url = getCookie(i);
		console.log(url);
		$.ajax({
				   type:"GET",  
				   url:url,
				   dataType:"json",
				   async:false,
				   success:function(data){   //function1()  
						baseHtml += '<table id="baseTable"><tr><td>Title</td><td>Due-Date</td><td>executor</td></tr>';
						$.each(data,function(inx,ele){
							baseHtml += '<tr>';
							baseHtml += '<td>'+ele.content+'</td>';
							baseHtml += '<td>'+new Date(ele.dueDate).format("yyyy-MM-dd")+"</td>";
							baseHtml += '<td>'+ele.executor.name+"</td>";
							baseHtml += '</tr>';
						})
						baseHtml += '</table><hr>';
				   },
				   failure:function (result) {   
					   alert('/(��o��)/~~��ȡ����ʧ��..');   
				   },  
		});
	}
	$("body").html(baseHtml);
})

//��ȡcookies 
function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
}
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

Date.prototype.format = function (format) { 
var o = { 
"M+": this.getMonth() + 1, //month 
"d+": this.getDate(), //day 
"h+": this.getHours(), //hour 
"m+": this.getMinutes(), //minute 
"s+": this.getSeconds(), //second 
"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
"S": this.getMilliseconds() //millisecond 
} 
if (/(y+)/.test(format)) format = format.replace(RegExp.$1, 
(this.getFullYear() + "").substr(4 - RegExp.$1.length)); 
for (var k in o) if (new RegExp("(" + k + ")").test(format)) 
format = format.replace(RegExp.$1, 
RegExp.$1.length == 1 ? o[k] : 
("00" + o[k]).substr(("" + o[k]).length)); 
return format; 
}