
"use strict";
function saveMoze(){
	for(var i=0; i<20; i++){
		ajax.get("https://api.leancloud.cn/1.1/classes/MozePayData?where="+encodeURIComponent('{"MozeId":"'+mozeData[i]+'"}'),null,function(responseText){
			var results = JSON.parse(responseText);
			if(results.results == null || results.results.length == 0)
			{
				mozeData[i].SmallType = mozeData[i].SmallType.substring(9);
				mozeData[i].PaymentType = mozeData[i].PaymentType.substring(12);
				mozeData[i].Bigtype = (mozeData[i].Bigtype.split('_'))[0];
				ajax.post("https://api.leancloud.cn/1.1/classes/MozePayData",mozeData[i],function(responseText){

				},false);
			}
		},false);
	}
	alert("Done");
}
	
