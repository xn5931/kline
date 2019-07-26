var http = require("http")
var fs = require("fs")
var reqCount = 0;
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




//
function autoTest(){

  var url = "https://api.binance.com/api/v1/ticker/24hr";

  request(url, function (error, response, body) {
            console.log("binanceApiData>>>2",error,body);
            if (!error && response.statusCode == 200) {
                
                try{
                    var body = JSON.parse(body);//将json字符串转换成json对象
                    console.log("autoTest...",body);
                }catch(e){
                    console.log("error...",e);
                    res.json({'res_code':'01030003'},{'describe':'res json error- -Too Many Requests'});
                    return ;
                }
            }
        })   
       
      
    
   
}

setInterval(autoTest, 2000);





