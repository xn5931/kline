var http = require("http")
var fs = require("fs")
var reqCount = 0;
var kline_type = require('../../kline_type');
var request = require('request');
 
http.createServer(function(req,res){

	var path = req.url;	
	console.log("path1: "+path)
	sendFile(res,path);
}).listen(3001)
 
function sendFile(res,path){

	var path = process.cwd()+path;

	fs.readFile(path,function(err,stdout,stderr){
		if(!err){

			var data = stdout;
			var type = path.substr(path.lastIndexOf(".")+1,path.length)
			res.writeHead(200,{'Content-type':"text/"+type});	//在这里设置文件类型，告诉浏览器解析方式
			res.write(data);
		}
		res.end();
	})
}




//自动测试单元 - - 测试k线数据的完整性
function autoTestKlineData(){

    kline_type.kline_type(function(options){

      for(i in options){
        
        setTimeout(()=>{//for循环控速
          reqCount ++ ;

          if (reqCount ==i || options[reqCount] === undefined) { reqCount = 0; }
          var collection = 'k_'+options[reqCount].ex+'_'+options[reqCount].currency+'_'+options[reqCount].period;

          let url = 'http://localhost:8080/api/test/kline?collection='+collection+'&period='+options[reqCount].period+'&ex='+options[reqCount].ex+'&currency='+options[reqCount].currency;
          //console.log("monitor - - api.......",url);
          request(url, function (req,res) {

            if (res && res.body) {

                console.log("test kline>>>",res.body);
            }else{

              console.log("autoTestKlineData 出错 !!!!!!!");
            }
          })
        }, 300 * i);  
      }
    })
   
}

setInterval(autoTestKlineData, 15000);





