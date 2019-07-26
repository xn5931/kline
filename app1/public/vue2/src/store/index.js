import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'
import {getCoinListInfo,getMonitorInfo,getCoinmarketcaplist} from '@/api/getCoinData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	getCoinListInfo:[],
	getCoinListInfo_huobiUSDT:[],//huobi
	getCoinListInfo_huobiBTC:[],//huobi
	getCoinListInfo_huobiETH:[],//huobi
	getCoinListInfo_huobiHT:[],//huobi
	getCoinListInfo_huobi:[],
	updateTime_huobi:[],//huobi - time
	

	getCoinListInfo_binanceUSDT:[],//binance
	getCoinListInfo_binanceBTC:[],//binance
	getCoinListInfo_binanceETH:[],//binance
	getCoinListInfo_binanceBNB:[],//binance
	updateTime_binance:[],//binance - time

	getCoinListInfo_okexUSDT:[],//okex
	getCoinListInfo_okexBTC:[],//okex
	getCoinListInfo_okexETH:[],//okex
	getCoinListInfo_okexOKB:[],//okex
	updateTime_okex:[],//okex - time

	getCoinListInfo_gateUSDT:[],//gate
	getCoinListInfo_gateBTC:[],//gate
	getCoinListInfo_gateETH:[],//gate
	updateTime_gate:[],//gate - time
	get_monitor:[],//monitor异动消息
	get_coinmarketcaplist:[],//coinmarketcaplist
	coinmarketcaplist_last_updated:[],//coinmarketcap的last_updated
	monitorlist_last_updated:[],//monitorlist的last_updated时间
	monitorlist_state_updated:[],//monitorlist的更新状态
	abnormalFluctuation_data:[],
	highTurnoverRate:[],
	testNetState:[-3],//网络状态 - - 网速
	priceDislocation:[],//破位
	priceBreach:[],//突破
	baseCurrencyType:[0]//货币计算基数 0 美元 1人民币 2 比特币


}

const mutations = {
	saveAdminInfo(state, adminInfo){

		state.adminInfo = adminInfo;

	},
	getCoinListInfoMutations(state, getCoinListInfo){//获取币种列表信息
		state.getCoinListInfo = getCoinListInfo;//修改币种列表的state参数
	},
	getCoinListInfoMutationsBtc(state, getCoinListInfoBtc){
		state.getCoinListInfo_huobiBTC = getCoinListInfoBtc;//修改币种列表的state参数--huobi
	},
	getCoinListInfoMutationsEth(state, getCoinListInfoEth){
		state.getCoinListInfo_huobiETH = getCoinListInfoEth;//修改币种列表的state参数--huobi
	},
	getCoinListInfoMutationsUsdt(state, getCoinListInfoUsdt){
		state.getCoinListInfo_huobiUSDT = getCoinListInfoUsdt;//修改币种列表的state参数--huobi
	},
	getCoinListInfoMutationsHt(state, getCoinListInfoHt){
		state.getCoinListInfo_huobiHT = getCoinListInfoHt;//修改币种列表的state参数--huobi
	},
	getCoinListInfoMutationsHuobi(state, getCoinListInfoHuobi){
		state.getCoinListInfo_huobi =getCoinListInfoHuobi;//huobi
	},
	changeKlineSymbolMutations(state, changeKlineSymbolInfo){
		state.tradingviewSymbol = changeKlineSymbolInfo;
	},
	getCoinListInfoMutationsOkexBtc(state, getCoinListInfoBtc){
		state.getCoinListInfo_okexBTC = getCoinListInfoBtc;//修改币种列表的state参数--okex
	},
	getCoinListInfoMutationsOkexEth(state, getCoinListInfoEth){
		state.getCoinListInfo_okexETH = getCoinListInfoEth;//修改币种列表的state参数--okex
	},
	getCoinListInfoMutationsOkexUsdt(state, getCoinListInfoUsdt){
		state.getCoinListInfo_okexUSDT = getCoinListInfoUsdt;//修改币种列表的state参数--okex
	},
	getCoinListInfoMutationsOkexOKB(state, getCoinListInfoOkb){
		state.getCoinListInfo_okexOKB = getCoinListInfoOkb;//修改币种列表的state参数--okex
	},
	getCoinListInfoMutationsGateBtc(state, getCoinListInfoBtc){
		state.getCoinListInfo_gateBTC = getCoinListInfoBtc;//修改币种列表的state参数--gate
	},
	getCoinListInfoMutationsGateEth(state, getCoinListInfoEth){
		state.getCoinListInfo_gateETH = getCoinListInfoEth;//修改币种列表的state参数--gate
	},
	getCoinListInfoMutationsGateUsdt(state, getCoinListInfoUsdt){
		state.getCoinListInfo_gateUSDT = getCoinListInfoUsdt;//修改币种列表的state参数--gate
	},
	getCoinListInfoMutationsBinanceBtc(state, getCoinListInfoBtc){
		state.getCoinListInfo_binanceBTC = getCoinListInfoBtc;//修改币种列表的state参数--binance
	},
	getCoinListInfoMutationsBinanceEth(state, getCoinListInfoEth){
		state.getCoinListInfo_binanceETH = getCoinListInfoEth;//修改币种列表的state参数--binance
	},
	getCoinListInfoMutationsBinanceUsdt(state, getCoinListInfoUsdt){
		state.getCoinListInfo_binanceUSDT = getCoinListInfoUsdt;//修改币种列表的state参数--binance
	},
	updateTime_huobiMutations(state, updateTime_huobi){
		state.updateTime_huobi = updateTime_huobi;//huobi - time
	},
	updateTime_binanceMutations(state, updateTime_binance){
		state.updateTime_binance = updateTime_binance;//binence - time 
	},
	updateTime_gateMutations(state, updateTime_gate){
		state.updateTime_gate = updateTime_gate;//gate - time
	},
	updateTime_okexMutations(state, updateTime_okex){
		state.updateTime_okex = updateTime_okex;//okex - time
	},
	get_monitorMutations(state, get_monitor){
		state.get_monitor = get_monitor;//monitor异动消息
	},
	get_coinmarketcaplistMutations(state,get_coinmarketcaplist){
		state.get_coinmarketcaplist = get_coinmarketcaplist;
	},
	coinmarketcaplist_last_updated(state,last_updated){
		state.coinmarketcaplist_last_updated = last_updated;
	},
	monitorlist_last_updated(state,last_updated){
		state.monitorlist_last_updated = last_updated;
	},
	monitorlist_state_updated(state,state_updated){
		state.monitorlist_state_updated = state_updated;
	},
	abnormalFluctuationMutations(state,abnormalFluctuation_data){
		state.abnormalFluctuation_data = abnormalFluctuation_data;
	},
	highTurnoverRateMutations(state,highTurnoverRate){//高换手率
		state.highTurnoverRate = highTurnoverRate;
	},
	testNetStateMutations(state,testNetState){//网速
		state.testNetState = testNetState;
	},
	monitor_priceDislocation(state,priceDislocation){//监测价格突破
		state.priceDislocation = priceDislocation;
	},
	monitor_priceBreach(state,priceBreach){//监测价格破位
		state.priceBreach = priceBreach;
	},
	updateBaseCurrencyType(state,baseCurrency){//货币计算基数 0 美元 1人民币 2 比特币
		state.baseCurrencyType = baseCurrency;
	}


	
						
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			 console.log(err)
		}
	},
	async getCoinListBinance({commit},msgs){

		const t = setInterval(async function() {	

			var exType = "binance";
			const res = await getCoinListInfo(exType)//获取binance的api数据

			try{
				
				if (res) {

					var btcSymbolBinance=[];//BTC交易对
					var ethSymbolBinance=[];//ETH交易对
					var usdtSymbolBinance=[];//USDT交易对updateTime_huobiMutations
					var data = res.data.data;
					var updateTime = {"time":data[0].TIMESTAMP};//更新时间

					for (var i in data) {
						
						var symbol =data[i].SYMBOL_TYPE;//遍历所有属性交易对-判断交易对的所属
							symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属

						if (symbol == "tc") {//BTC
							btcSymbolBinance.push(data[i])//挑选出btc交易对的数据push到新数组 
						}
						if (symbol == "th") {//ETH
							ethSymbolBinance.push(data[i])//挑选出btc交易对的数据push到新数组 
						}
						if (symbol == "dt") {//USDT
							usdtSymbolBinance.push(data[i])//挑选出btc交易对的数据push到新数组 
						}	
					}

					commit('getCoinListInfoMutationsBinanceBtc',btcSymbolBinance);//更新btcSymbolGate里面的交易对数据数据
					commit('getCoinListInfoMutationsBinanceEth',ethSymbolBinance);//更新ethSymbolGate里面的交易对数据数据
					commit('getCoinListInfoMutationsBinanceUsdt',usdtSymbolBinance);//更新usdtSymbolGate里面的交易对数据数据
					commit('updateTime_binanceMutations',updateTime);//更新binance - time
					
				}else{
					throw new Error(res)
				}
			}catch(err){
				 console.log("getCoinListBinance",err)
			}
		  }, 3000)		
	},
	async changeKlineSymbol({commit},msgs){


	},
	async getCoinList({commit},exType){//获取币种列表数据 - - huobi

		const t = setInterval(async function() {

			const res = await getCoinListInfo(exType)//
			    	
			try{
				if (res) {

					var btcSymbol=[];//btc交易对
					var ethSymbol=[];//eth交易对
					var usdtSymbol=[];//usdt交易对
					var htSymbol=[];//ht交易对
					var data = res.data.data;//接收后台返的json k线数据
					var updateTime = {"time":data[0].TIMESTAMP};//更新时间	

					for (var i in data) {
						
						var symbol =data[i].SYMBOL_TYPE;//遍历所有属性交易对
						symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属

						if (symbol == "tc") {btcSymbol.push(data[i])}//挑选出btc交易对的数据push到新数组
						if (symbol == "th") {ethSymbol.push(data[i])}//eth
						if (symbol == "dt") {usdtSymbol.push(data[i])}//usdt
						if (symbol == "ht") {htSymbol.push(data[i])}//ht
					
					}


					commit('getCoinListInfoMutationsBtc',btcSymbol);//更新btcSymbol里面的交易对数据数据
					commit('getCoinListInfoMutationsEth',ethSymbol);//更新ethSymbol里面的交易对数据数据
					commit('getCoinListInfoMutationsUsdt',usdtSymbol);//更新usdtSymbol里面的交易对数据数据
					commit('getCoinListInfoMutationsHt',htSymbol);//更新htSymbol里面的交易对数据数据
					commit('updateTime_huobiMutations',updateTime);//更新huobi - time

				}else{
					throw new Error(res)
				}
			}catch(err){
				 console.log("huobi",err)
			}
		  }, 3000)
	},
	async getCoinListOkex({commit}){//获取币种列表数据

		const t = setInterval(async function() {	

			var exType = "okex";
			const res = await getCoinListInfo(exType)//获取okex的api数据	
			try{
				if (res) {

					var btcSymbolOkex=[];//btc交易对
					var ethSymbolOkex=[];//eth交易对
					var usdtSymbolOkex=[];//usdt交易对
					var okbSymbolOkex=[];//ht交易对

					var data = res.data.data;
					var updateTime = {"time":data[0].TIMESTAMP};//更新时间

					for (var i in data) {
						
						var symbol =data[i].SYMBOL_TYPE;//遍历所有属性交易对
						symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属
						
						if (symbol == "tc") {btcSymbolOkex.push(data[i])}//挑选出btc交易对的数据push到新数组
						if (symbol == "th") {ethSymbolOkex.push(data[i])}
						if (symbol == "dt") {usdtSymbolOkex.push(data[i])}
						if (symbol == "kb") {okbSymbolOkex.push(data[i])}
					}

					commit('getCoinListInfoMutationsOkexBtc',btcSymbolOkex);//更新btcSymbolOkex里面的交易对数据数据
					commit('getCoinListInfoMutationsOkexEth',ethSymbolOkex);//更新ethSymbolOkex里面的交易对数据数据
					commit('getCoinListInfoMutationsOkexUsdt',usdtSymbolOkex);//更新usdtSymbolOkex里面的交易对数据数据
					commit('getCoinListInfoMutationsOkexOKB',okbSymbolOkex);//更新htSymbolOkex里面的交易对数据数据
					commit('updateTime_okexMutations',updateTime);//更新okex- time

				}else{throw new Error(res)}
			}catch(err){
				 console.log("getCoinListOkex",err)
			}
		  }, 3000)
	},
	async getCoinListGate({commit}){//获取币种列表数据

		const t = setInterval(async function() {	

			var exType = "gate";
			const res = await getCoinListInfo(exType)//获取okex的api数据   	
			try{
				if (res) {

					var btcSymbolGate=[];//BTC交易对
					var ethSymbolGate=[];//ETH交易对
					var usdtSymbolGate=[];//USDT交易对
					var qtumSymbolGate=[];//QTUM交易对
					var data = res.data.data;
					var updateTime = {"time":data[0].TIMESTAMP};//更新时间

					for (var i in data) {
						
						var symbol =data[i].SYMBOL_TYPE;//遍历所有属性交易对-判断交易对的所属
						symbol = symbol.substring(symbol.length-2);//截取后两位字符判断交易对的所属

						if (symbol == "tc") {btcSymbolGate.push(data[i])}//挑选出btc交易对的数据push到新数组 
						if (symbol == "th") {ethSymbolGate.push(data[i])}//挑选出ETH交易对的数据push到新数组 
						if (symbol == "dt") {usdtSymbolGate.push(data[i])}//挑选出USDT交易对的数据push到新数组 	
					}

					commit('getCoinListInfoMutationsGateBtc',btcSymbolGate);//更新btcSymbolGate里面的交易对数据数据
					commit('getCoinListInfoMutationsGateEth',ethSymbolGate);//更新ethSymbolGate里面的交易对数据数据
					commit('getCoinListInfoMutationsGateUsdt',usdtSymbolGate);//更新usdtSymbolGate里面的交易对数据数据
					commit('updateTime_gateMutations',updateTime);//更新gate - time
					
				}else{
					throw new Error(res)
				}
			}catch(err){
				 console.log("getCoinListGate",err)
			}
		  }, 3000)
	},
	async getMonitorAction({commit}){//获取币种列表数据
		
		const t = setInterval(async function() {

			var updateState ={"updateState":0}
			commit('monitorlist_state_updated',updateState);//监测数据的更新状态 - - int
			var type = "monitor";
			const res = await getMonitorInfo(type)//获取okex的api数据

			try{//获取监测的数据
				if (res) {

					var data = res.data.data;
					var j = -1;
					var priceDislocation = [];//价格破位
					var priceBreach = [];//价格突破

					for(var i in data){
						j++;
						if(i == j){var newTime = data[j].VALID_TIME;}
						if(data[i].TYPE =='破位'){priceDislocation.push(data[i])};
						if(data[i].TYPE =='突破'){priceBreach.push(data[i])};
					}

					var updateTime = {"time":newTime};//更新时间
					var updateState ={"updateState":1};//监测状态 - - 返回了新数据

					commit('monitor_priceDislocation',priceDislocation);//价格破位
					commit('monitor_priceBreach',priceBreach);//价格突破
					commit('monitorlist_last_updated',updateTime);//监测数据的更新时间
					commit('monitorlist_state_updated',updateState);//监测数据的更新状态
					commit('get_monitorMutations',data);//更新

					   
					 
					     
					

				}else{
					throw new Error(res)
				}

			}catch(err){
				 console.log("getMonitorAction",err)
			}
		  }, 3000)
	},
	async getCoinmarketcaplist({commit}){//获取coinmarketcap数据

		const t = setInterval(async function() {
			var type = 'all';
			const res = await getCoinmarketcaplist(type)
				try{
					if (res) {
						var data = res.data.data;
						var last_updated = {"time":data[0].last_updated};//更新时间
						var abnormalFluctuation = [];//异常波动涨跌幅
						var highTurnoverRate = [];//高换手率
							
						for(var i in data){
							if(data[i].usd_percent_change_24h < -5){
								
								abnormalFluctuation.push(data[i]);//异常波动涨跌幅
							}
							if(data[i].usd_percent_change_24h >5){
								
								abnormalFluctuation.push(data[i]);//异常波动涨跌幅
							}
							if(data[i].turnover>30){//筛选高换手率的交易对
								highTurnoverRate.push(data[i]);
							}
						}
						if (state.baseCurrencyType ===1) {//0美元 1人民币 2比特币
							for(var i in data){
								
								var cnyPrice = data[i].usd_price * 7 ;
									data[i].usd_price = cnyPrice.toFixed(2);
								var cny_volume_24h = data[i].usd_volume_24h * 7 ;
									data[i].usd_volume_24h = cny_volume_24h.toFixed(2);
								var cny_market_cap = data[i].usd_market_cap * 7 ;
									data[i].usd_market_cap = cny_market_cap.toFixed(2);
							}
						}
										
						commit('get_coinmarketcaplistMutations',data);//Coinmarketcaplist - all
						commit('coinmarketcaplist_last_updated',last_updated);//Coinmarketcaplist - - 更新时间
						commit('abnormalFluctuationMutations',abnormalFluctuation);//异常波动
						commit('highTurnoverRateMutations',highTurnoverRate);//高换手率
						
					}else{
						throw new Error(res)
					}
				}catch(err){
					console.log("getCoinmarketcaplist",err)
				}
		  }, 3000)
	
	},
	async testNet({commit}){//测网速

		const t = setInterval(async function() {
			//测网速
			function measureBW(fn,time) {
			time = time || 1;
			var startTime, endTime, fileSize;
			var count = time ;
			var _this = this;
			function measureBWSimple () {
			    var xhr = new XMLHttpRequest();
			    xhr.onreadystatechange = () => {
			        if (xhr.readyState === 4 && xhr.status === 200) {
			            if(!fileSize){
			                fileSize = xhr.responseText.length;
			            }
			            count --;
			            if(count<=0){
			                endTime = Date.now();
			                var speed = fileSize * time  / ((endTime - startTime)/1000) / 1024;
			                fn && fn(Math.floor(speed));
			            }
			        }
			    }
			    xhr.open("GET", "https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png?" + Math.random(), true);
			    xhr.send();
			}
				startTime = Date.now();
				for(var x = time;x>0;x--){
				    measureBWSimple()
				}
			}

			measureBW((speed)=>{

				var testNetState = {};//wifi网络图标的状态显示
				if (speed>1200) {testNetState = {'netSpeed':1};}//满格
				else if (speed<1200 && speed>800) {testNetState = {'netSpeed':-1};}//少1格
				else if (speed<800 && speed>400) {testNetState = {'netSpeed':-2};}//少2格
				else if (speed<400 && speed>50) {testNetState = {'netSpeed':-3};}//少3格
				else if (speed<50) {testNetState = {'netSpeed':0};}//没有网络
				else{console.log("none");}
				console.log(speed + 'KB/sec');  //913 KB/sec//speed = speed + " KB/sec";
				commit('testNetStateMutations',testNetState);//Coinmarketcaplist - - 更新时间
				},10)

		}, 20000)
	},
	async changeMoney({commit},msgs){//切换货币计算基数

		var data = state.get_coinmarketcaplist;
		//1人民币
		if (msgs ==='CNY') {
		var baseCurrencyType = 1;
			for(var i in data){
			
				var cnyPrice = data[i].usd_price * 7 ;
					data[i].usd_price = cnyPrice.toFixed(2);
				var cny_volume_24h = data[i].usd_volume_24h * 7 ;
					data[i].usd_volume_24h = cny_volume_24h.toFixed(2);
				var cny_market_cap = data[i].usd_market_cap * 7 ;
					data[i].usd_market_cap = cny_market_cap.toFixed(2);
			}
		}
		if (msgs ==='USD') {
		var baseCurrencyType = 0;
			for(var i in data){

				var cnyPrice = data[i].usd_price / 7 ;
					data[i].usd_price = cnyPrice.toFixed(2);
				var cny_volume_24h = data[i].usd_volume_24h / 7 ;
					data[i].usd_volume_24h = cny_volume_24h.toFixed(2);
				var cny_market_cap = data[i].usd_market_cap / 7 ;
					data[i].usd_market_cap = cny_market_cap.toFixed(2);
			}
		}
		
		commit('updateBaseCurrencyType',baseCurrencyType);//切换货币计算基数
		commit('get_coinmarketcaplistMutations',data);//Coinmarketcaplist - all
	}
}



export default new Vuex.Store({
	state,
	actions,
	mutations,
})





