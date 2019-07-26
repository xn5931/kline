var http = require("http")
var fs = require("fs")
var reqCount = 0;
var kline_type = require('./kline_type');
var request = require('request');
var timeStamp = new Date().getTime();//当前时间戳
 
http.createServer(function(req,res){

	var path = req.url;	

	console.log("path1: "+path)
	
	sendFile(res,path);

}).listen(3000)
 
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

//k线数据录入
function intervalFunc() {  


    kline_type.kline_type(function(options){
      //console.log("options.....",options);
      for(i in options){

        setTimeout(()=>{//for循环控速
          
        console.log('insert kline data runing>>>>>>>>>>>>>>>',i,reqCount);
        //插入k线数据api   
        reqCount ++ ;

        if (reqCount ==i || options[reqCount] === undefined) { reqCount = 0; }
        
        var url = 'http://localhost:8080/api/kline/insert?ex='+options[reqCount].ex+'&currency='+options[reqCount].currency+'&period='+options[reqCount].period; 
        
        console.log("当前请求的api.......",url);
        
        var request = require('request');

        request(url, function (req,res) {

          if (res && res.body) {

            console.log("前端接收到的返回值>>>",res.body);

          }else{

            console.log("api接口出错 !!!!!!!");

          }           
        })   
        }, 3000 * i);  
      }
    })
}
setInterval(intervalFunc, 9000);

//获取最新列表数据
function getLatestListData(){

  var options = [{ex : "huobi"},{ex : "gate"},{ex : "okex"}];
  //var options = [{ex : "huobi"},{ex : "binance"},{ex : "gate"},{ex : "okex"}];

  console.log('获取最新列表数据runing>>>>>>>>>>>>>>>>>>>>>,i,reqCount');

  for(i in options){

    let url = 'http://localhost:8080/api/symbol/insert/latestData?ex='+options[i].ex;

    console.log("当前请求的api.......",url);

    var request = require('request');

    request(url, function (req,res) {

      if (res && res.body) {

        console.log("前端接收到的返回值>>>>>>",res.body);

      }else{

        console.log("getLatestListData-api接口出错 !!!!!!!");

      }
        
     })
  }      
}
setInterval(getLatestListData, 8000);

//监测k线数据
function monitor(){

    kline_type.kline_type(function(options){

      for(i in options){
        
        //console.log(collection);
        
        setTimeout(()=>{//for循环控速
          reqCount ++ ;

          if (reqCount ==i || options[reqCount] === undefined) { reqCount = 0; }
          var collection = 'k_'+options[reqCount].ex+'_'+options[reqCount].currency+'_'+options[reqCount].period;
          if (reqCount ==i) { collection = coinmarketcap_listings_latest};

          let url = 'http://localhost:8080/api/kline/monitor?collection='+collection+'&period='+options[reqCount].period+'&ex='+options[reqCount].ex+'&currency='+options[reqCount].currency;
          console.log("monitor - - api.......",url);
          request(url, function (req,res) {

            if (res && res.body) {

             //ççç console.log("monitor - res - >>>>>>",res.body);
            }else{

              console.log("getLatestListData-api接口出错 !!!!!!!");
            }
          })
        }, 300 * i);  
      }
    })
   
}
setInterval(monitor, 5000);

//1h更新1次Coinmarketcap的数据
function monitorCoinmarketcap(){
  setTimeout(()=>{
    let url = 'http://localhost:8080/api/coinmarketcap/listLatest/insert';

    request(url,function (req,res) {

      if (res && res.body) {

        console.log("Coinmarketcap update 成功",res.body);
      }else{

        console.log("monitorCoinmarketcap-api接口出错 !!!!!!!");
      }
    }) 
  }, 300 * i);   
}


setInterval(monitorCoinmarketcap, 3600000);//1h更新一次3600
















