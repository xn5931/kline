<template>
  <div class="fillcontain" id="dom-vue-model">
    <!-- 栅格系统 start-->
    <!-- 留白 start first-->
    <el-row>
      <el-col :span="24">
        <div class="top-bg-first">
          <label></label>
        </div>
      </el-col>
    </el-row>
    <!-- 留白 end first-->
    <!-- 留白 start next-->
    <div class="top-bg-next">
      <el-card class="top-next-card">
        <el-row>
          <el-col :span="2"><div></div></el-col>
          <el-col :span="1">
            <div @row-click="dogLogo"><img src="../img/topLogo.png" class="topLogo"></div>
            <!-- 网络信号 -->
            <div class ="testNet" v-for="speed in testNetState">

                <img src="../img/wifiOnline.png" v-if="speed ===1" class="wifiImg">
                <img src="../img/wifiWeak1.png" v-if="speed ===-1" class="wifiImg">
                <img src="../img/wifiWeak2.png" v-if="speed ===-2" class="wifiImg">
                <img src="../img/wifiWeak3.png" v-if="speed ===-3" class="wifiImg">
                <img src="../img/wifiOffline.png" v-if="speed ===0" class="wifiImg">
          </div>
          <!-- 网络信号 -->
          </el-col>
          <el-col :span="21">
            <!-- 设置按钮 -->
            <i class="el-icon-setting" id="el-icon-setting-img"></i> 
          </el-col>
        </el-row>
         
       
      </el-card>
    </div>
    <!-- 留白 end next-->
  <el-row>
    <el-col :span="1"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="9" class="grid-content bg-purple">
    <!-- 各交易各币种导航栏start -->
    <el-tabs type="border-card">

      <el-tab-pane label="huobi" id="huobi-tab-pane">

        <!-- time start-->
          <el-card class="box-card updatetime-box-card" >
            <span v-for="t in updateTime_huobi" class="updatetime-span">{{t}}</span>
          </el-card>
          <!-- time end-->

        <el-tabs type="border-card">  
          <!-- 火币usdt交易对板块 start-->
          <el-tab-pane label="usdt">
            <template>
              <el-table :data="getCoinListInfo_huobiUSDT" 
              :default-sort = "{prop: 'close', order: 'descending'}"
              :highlight-current-row="true"
              @row-click="handleCurrentChangeHuobi"
              max-height="418"
              style="width:100%">

                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                 <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>


          <el-tab-pane label="btc">
            <template>
               <el-table
                :data="getCoinListInfo_huobiBTC"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeHuobi"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>
          <!-- 火币usdt交易对板块 end-->

          <!-- 火币eth交易对板块 start-->
          <el-tab-pane label="eth">
            <template>
               <el-table
                :data="getCoinListInfo_huobiETH"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeHuobi"
                id="rowUsdt"
                max-height="418"
                >
  
               <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>
           <!-- 火币eth交易对板块 end-->

            <!-- 火币ht交易对板块 start-->
          <el-tab-pane label="ht">
            <template>
              <el-table
                :data="getCoinListInfo_huobiHT"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeHuobi"
                max-height="418"
                >
    
                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>
           <!-- 火币ht交易对板块 end-->

        </el-tabs>

      </el-tab-pane>

      <el-tab-pane label="binance"id="binance-tab-pane">
        
        <!-- time start-->
        <el-card class="box-card updatetime-box-card" >
          <span v-for="t in updateTime_binance" class="updatetime-span">{{t}}</span>
        </el-card>
        <!-- time end-->

        <el-tabs type="border-card" id="okex-tab-pane">

          <el-tab-pane label="usdt">
            <template>
              <el-table
                :data="getCoinListInfo_binanceUSDT"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeBinance"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种" sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="btc">
                
            <template>
              <el-table
                :data="getCoinListInfo_binanceBTC"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeBinance"
                max-height="418"
                >
                
                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>

          </el-tab-pane>

          <el-tab-pane label="eth">
            <template>
              <el-table
                :data="getCoinListInfo_binanceETH"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeBinance"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

        </el-tabs>


      </el-tab-pane>

      <el-tab-pane label="okex">

        <!-- time start-->
          <el-card class="box-card updatetime-box-card" >
            <span v-for="t in updateTime_okex" class="updatetime-span">{{t}}</span>
          </el-card>
          <!-- time end-->

        <el-tabs type="border-card" id="okex-tab-pane">

          <el-tab-pane label="usdt">
            <template>
              <el-table
                :data="getCoinListInfo_okexUSDT"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeOkex"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种" sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="btc">
                
            <template>
              <el-table
                :data="getCoinListInfo_okexBTC"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeOkex"
                max-height="418"
                >
                
                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>

          </el-tab-pane>

          <el-tab-pane label="eth">
            <template>
              <el-table
                :data="getCoinListInfo_okexETH"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeOkex"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

        </el-tabs>
      </el-tab-pane>
       <!-- gate交易对板块 start-->
      <el-tab-pane label="gata" id="gata-tab-pane">

          <!-- time start-->
          <el-card class="box-card updatetime-box-card" >
            <span v-for="t in updateTime_gate" class="updatetime-span">{{t}}</span>
          </el-card>
          <!-- time end-->

        <el-tabs type="border-card">

          <el-tab-pane label="USDT">
            <template>
              <el-table
                :data="getCoinListInfo_gateUSDT"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeGate"
                max-height="418"
                >

                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量" ></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="BTC">
            <template>
              <el-table :data="getCoinListInfo_gateBTC" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}"
                :highlight-current-row="true"
                @row-click="handleCurrentChangeGate"
                max-height="418"
                >
    
                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="ETH">
            <template>
              <el-table
              :data="getCoinListInfo_gateETH"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
              :highlight-current-row="true"
              @row-click="handleCurrentChangeGate"
              max-height="418">
    
                <el-table-column prop="COINNAME"label="币种"sortable></el-table-column>
                <el-table-column prop="PRICE"label="价格"></el-table-column>
                <el-table-column prop="RATE_PERCENT" label="涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                <el-table-column prop="VOL" label="成交量"></el-table-column>

              </el-table>
            </template>
          </el-tab-pane>

        </el-tabs>
      </el-tab-pane>
    </el-tabs>
      <!-- gate交易对板块 end-->
    <!-- 各交易各币种导航栏end -->
  </el-col>
  
      <!-- k线 start-->
      <el-col :span="14" class="grid-content bg-purple-light">
        <div class="tradingview-widget-container">
          <div id="tradingview_51cda"></div>
          <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/HUOBI-BSUSDT/" rel="noopener" target="_blank"></a></div>
        </div>
      </el-col>
 
    </el-row>
    <!-- 栅格系统 end-->
    <!-- k线 end--> 

  <!-- coinmarketcaplist head start-->
      <el-row>
      <el-col :span="1"><div class="coinmarketcaplist-content bg-purple-light"></div></el-col>
      <el-col :span="22">
         
          <el-card>
            <!-- time start-->
            <span v-for="t in coinmarketcaplist_last_updated" class="updatetime-coinmarketcaplist">{{t}}</span>
             <!-- time end-->
            <h4 class="updatetime-coinmarketcaplist-h">排行榜</h4>
            <span class="switch_span">
              <template>
                <el-select v-model="value" placeholder="USD" @change="moneyOptionsSelect">
                  <el-option
                    v-for="item in moneyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </span>  
        

          </el-card>
         
          <span>
          </span>
      </el-col>
      <el-col :span="1"><div class="coinmarketcaplist-content bg-purple"></div></el-col>
    </el-row>
   <!-- coinmarketcaplist head end-->

   <!-- coinmarketcaplist body start-->
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22">
        <div id="coinMarketDiv">
          <div class="grid-content m-bg">
           
            <template>

              <el-table :data="get_coinmarketcaplist" style="width: 100%" max-height="578">
                  <el-table-column fixed type="index" width="80"></el-table-column>
                  <el-table-column prop="symbol" label="币种" width="100"></el-table-column>
                  <el-table-column prop="usd_price" label="价格" width="150"></el-table-column>
                  <el-table-column prop="usd_volume_24h" label="24H成交额(亿)" width="150"></el-table-column>
                  <el-table-column prop="usd_market_cap" label="市值(亿)" width="150"></el-table-column>
                  <el-table-column prop="turnover" label="换手率" width="100"></el-table-column>
                   <el-table-column prop="usd_percent_change_1h" label="1H涨跌幅" filter-placement="bottom-end" width="150">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.usd_percent_change_1h >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.usd_percent_change_1h}}</el-tag>
                    </template>
                  </el-table-column>
                   <el-table-column prop="usd_percent_change_24h" label="24H涨跌幅" filter-placement="bottom-end" width="150">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.usd_percent_change_24h >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.usd_percent_change_24h}}</el-tag>
                    </template>
                  </el-table-column>
                   <el-table-column prop="usd_percent_change_7d" label="7D涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.usd_percent_change_7d >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.usd_percent_change_7d}}</el-tag>
                    </template>
                  </el-table-column>
                  
              </el-table>

            </template>

          </div>
        </div>
      </el-col>
      <el-col :span="1"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <!-- coinmarketcaplist body end-->

  <!-- 数据监测 head start-->
      <el-row>
      <el-col :span="1"><div class="coinmarketcaplist-content bg-purple-light"></div></el-col>
      <el-col :span="22">
         
          <el-card>
            <!-- time start-->
            <span v-for="t in monitorlist_last_updated" class="updatetime-coinmarketcaplist">{{t}}</span>
             <!-- time end-->
            <h4 class="updatetime-coinmarketcaplist-h">数据监测</h4>
            <div v-for="state in monitorlist_state_updated">
              <img src="../img/online.png" class="onOffImg" v-if="state >0">
              <img src="../img/offline.png" class="onOffImg" v-else>
            </div>
            <!-- v-bind:class="{ display:none}" monitorlist_state_updated-->
          </el-card>
         
          <span>
          </span>
      </el-col>
      <el-col :span="1"><div class="coinmarketcaplist-content bg-purple"></div></el-col>
    </el-row>
   <!-- 数据监测 head end-->

    <!-- 数据阵列 start-->
    <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">
        <el-tabs type="border-card">

          <el-tab-pane label="异常波动">
             <template>
              <el-table :data="abnormalFluctuation_data" style="width: 100%" max-height="500">
                  <el-table-column fixed type="index" width="75"></el-table-column>
                  <el-table-column prop="symbol" label="币种" width="100"></el-table-column>
                  <el-table-column prop="usd_price" label="价格" width="125"></el-table-column>
                  <el-table-column prop="usd_percent_change_24h" label="24H涨跌幅" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.usd_percent_change_24h >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.usd_percent_change_24h}}</el-tag>
                    </template>
                  </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
            
          <el-tab-pane label="高换手率">
            <template>
              <el-table :data="highTurnoverRate" style="width: 100%" max-height="500">
                  <el-table-column fixed type="index" width="75"></el-table-column>
                  <el-table-column prop="symbol" label="币种" width="90"></el-table-column>
                  <el-table-column prop="usd_price" label="价格" width="110"></el-table-column>
                  <el-table-column prop="usd_percent_change_24h" label="24H涨跌幅" width="110" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.usd_percent_change_24h >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.usd_percent_change_24h}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="换手率" prop="turnover"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>

          <el-tab-pane label="价格破位">
            <template>
              <el-table :data="priceDislocation" style="width: 100%" max-height="500">
                  <el-table-column fixed type="index" width="75"></el-table-column>
                  <el-table-column prop="CURRENCY" label="币种" width="90"></el-table-column>
                  <el-table-column prop="PRICE" label="价格" width="110"></el-table-column>
                  <el-table-column prop="RATE_PERCENT" label="24H涨跌幅" width="110" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="交易所" prop="EX"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="价格突破">
            <template>
              <el-table :data="priceBreach" style="width: 100%" max-height="500">
                  <el-table-column fixed type="index" width="75"></el-table-column>
                  <el-table-column prop="CURRENCY" label="币种" width="90"></el-table-column>
                  <el-table-column prop="PRICE" label="价格" width="110"></el-table-column>
                   <el-table-column prop="RATE_PERCENT" label="24H涨跌幅" width="110" filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag effect="plain" :type="scope.row.RATE_PERCENT >0 ? 'success' : 'danger'" disable-transitions>{{scope.row.RATE_PERCENT}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="交易所" prop="EX"></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-tabs type="border-card">
            <el-tab-pane label="监控流水">
               <template>
                <el-table :data="get_monitor" style="width: 100%" max-height="500" :cell-class-name="changeCellStyle" >
                    <el-table-column fixed type="index" width="70"></el-table-column>
                    <el-table-column prop="EX" label="交易所" width="80"></el-table-column>
                    <el-table-column prop="CURRENCY" label="币种" width="100"></el-table-column>
                    <el-table-column prop="PERIOD" label="区间" width="85"></el-table-column>
                    <el-table-column prop="PRICE" label="价格" width="100"></el-table-column>
                    <el-table-column prop="START_TIME" label="开始" width="120"></el-table-column>
                    <el-table-column prop="VALID_TIME" label="有效" width="120"></el-table-column>
                    <el-table-column prop="TYPE" label="类型" filter-placement="bottom-end">
                      <template slot-scope="scope">
                        <el-tag :type="scope.row.TYPE === '突破' ? 'success' : 'danger'" disable-transitions>{{scope.row.TYPE}}</el-tag>
                      </template>
                    </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <!-- <el-tab-pane label="..."></el-tab-pane> -->
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>

    </el-row>
    <!-- 数据阵列 end-->

    <!-- 量能可视化 start-->
  <!--   <el-row>
      <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">
        <el-tabs type="border-card" class="grid-content">
          <el-tab-pane label="量能可视化">
             <div id="main" style="width: 200px;height:200px;"></div>
          </el-tab-pane>
          <el-tab-pane label="...">
            <div>...</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row> -->
    <!-- 量能可视化 end-->
      <!-- 最底部 start-->
      <el-row>
      <el-col :span="1"><div class="coinmarketcaplist-content bg-purple-light"></div></el-col>
        <el-col :span="22">
           
            <el-card>
              <div class="bottom-font">
                <span>calculating model</span>
              </div>
            </el-card>
           
            <span>
            </span>
        </el-col>
        <el-col :span="1"><div class="coinmarketcaplist-content bg-purple"></div></el-col>
    </el-row>
       <!-- 最底部 end-->
  </div>
</template>

<!-- TradingView Widget BEGIN -->
<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
<!-- TradingView Widget END -->

<script type="text/javascript">

import axios from 'axios'
import Vue from 'vue'
import {mapActions, mapState} from 'vuex'

export default {
  //生命周期：初始化阶段 运行中阶段 销毁阶段
    template:"#dom-vue-model",
    computed:{
      ...mapState(['getCoinListInfo']),//map state列表数据信息
      ...mapState(['getCoinListInfo_huobiUSDT']),//map state列表数据信息huobi
      ...mapState(['getCoinListInfo_huobiBTC']),//map state列表数据信息huobi
      ...mapState(['getCoinListInfo_huobiETH']),//map state列表数据信息huobi
      ...mapState(['getCoinListInfo_huobiHT']),//map state列表数据信息huobi
      ...mapState(['getCoinListInfo_huobi']),//map state列表数据信息huobi
      ...mapState(['updateTime_huobi']),//map state列表数据信息huobi

      ...mapState(['getCoinListInfo_okexUSDT']),//map state列表数据信息okex
      ...mapState(['getCoinListInfo_okexBTC']),//map state列表数据信息okex
      ...mapState(['getCoinListInfo_okexETH']),//map state列表数据信息okex
      ...mapState(['getCoinListInfo_okexOKB']),//map state列表数据信息okex
      ...mapState(['updateTime_okex']),//map state列表数据信息okex

      ...mapState(['getCoinListInfo_gateUSDT']),//map state列表数据信息gate
      ...mapState(['getCoinListInfo_gateBTC']),//map state列表数据信息gate
      ...mapState(['getCoinListInfo_gateETH']),//map state列表数据信息gate
      ...mapState(['updateTime_gate']),//map state列表数据信息gate

      ...mapState(['getCoinListInfo_binanceUSDT']),//map state列表数据信息binance
      ...mapState(['getCoinListInfo_binanceBTC']),//map state列表数据信息binance
      ...mapState(['getCoinListInfo_binanceETH']),//map state列表数据信息binance
      ...mapState(['updateTime_binance']),//map state列表数据信息binance
    
      ...mapState(['get_monitor']),//异动消息
      ...mapState(['get_coinmarketcaplist']),//coinmarketcap列表消息
      ...mapState(['coinmarketcaplist_last_updated']),//coinmarketcap的更新时间
      ...mapState(['monitorlist_last_updated']),//coinmarketcap的更新时间
      ...mapState(['abnormalFluctuation_data']),//异常波动的币种 
      ...mapState(['highTurnoverRate']),
      ...mapState(['monitorlist_state_updated']),//monitorlist的更新状态
      ...mapState(['testNetState']),//网速
      ...mapState(['priceDislocation']),//价格破位
      ...mapState(['priceBreach'])//价格突破

      
      


    },
    data() {
      return {
        //计价货币选择的选项框
         moneyOptions: [{
          value: 'USD',
          label: 'USD'
        }, {
          value: 'CNY',
          label: 'CNY'
        }],
    
        value5:'100',//货币类型切换按钮
        showOnline:false,//数据监测原点 - - 在线
        showOffline:true,//数据监测原点 - - 离线



        restaurants: [],
        state: '' ,
        value:'',
          gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
 
      };
    },

    methods:{
      ...mapActions(['getCoinList']),
      ...mapActions(['changeKlineSymbol']),
      ...mapActions(['getCoinListBinance']),
      ...mapActions(['getCoinListOkex']),
      ...mapActions(['getCoinListGate']),
      ...mapActions(['getMonitorAction']),
      ...mapActions(['getCoinmarketcaplist']),
      ...mapActions(['testNet']),
      ...mapActions(['changeMoney']),
      
      formatter(row, column) {
        return row.address;
      },
      resetDateFilter() {//监控流水 - - pass
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {//监控流水 - - pass
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {//监控流水 - - pass
        return row.address;
      },
      filterTag(value, row) {//监控流水 - - pass
        return row.tag === value;
      },
      filterHandler(value, row, column) {//监控流水 - - pass
        const property = column['property'];
        return row[property] === value;
      },
      changeCellStyle({row, column, rowIndex, columnIndex}) {
        console.log("row, column, rowIndex, columnIndex",row, column, rowIndex, columnIndex);
      //第八列添加 red 类
        if(columnIndex == 7){
          return 'red'
        }
        //某一行其中的一个变量applies值如果大于0，并且在第六列，即确定一个具体的单元格需要确定行和列
        if(parseFloat(row.applies) >0 && columnIndex == 5){
          return 'red'
        }
       },
      destroy:function(){

          this.$destroy()//
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      addNotesAction(val){
        console.log("start add Notes");
      },
      moneyOptionsSelect(val){//切换货币计算基数

        this.changeMoney(val);
      },
      handleCurrentChangeHuobi(val){//导航栏选择币种切换k线

        this.currentRow = val;//获取当前点击行的数据 - -导出2个参数币种和所属交易所
         new TradingView.widget({
          "width":818,
          "height": 600,
          "symbol": "HUOBI:"+val.COINNAME+val.SYMBOL_TYPE,
          "timezone": "exchange",
          "theme": "Light",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "withdateranges": true,
          "range": "ytd",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "no_referral_id": true,
          "container_id": "tradingview_51cda"
        });
      },
      handleCurrentChangeBinance(val){//导航栏选择币种切换k线

        this.currentRow = val;//获取当前点击行的数据 - -导出2个参数币种和所属交易所
         new TradingView.widget({
          "width":818,
          "height": 600,
          "symbol": "BINANCE:"+val.COINNAME+val.SYMBOL_TYPE,
          "timezone": "exchange",
          "theme": "Light",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "withdateranges": true,
          "range": "ytd",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "no_referral_id": true,
          "container_id": "tradingview_51cda"
        });
      },
      handleCurrentChangeOkex(val){//导航栏选择币种切换k线
         this.$message({
          message: '警告哦,没有OKEX的k线数据',
          type: 'warning'
        });
        
      },
      handleCurrentChangeGate(val){//导航栏选择币种切换k线
        this.$message({
          message: '警告哦,没有GATE的k线数据',
          type: 'warning'
        });
      
      },
      dogLogo(){
        this.$message({
            message: '汪汪',
            type: 'success'
          });
      }
    },
    
    beforeCreate:function(){

        //console.log('beforeCreate:刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳')           
    },
    created:function(){

        //console.log('created:这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数,在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取 接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染')
    },
    beforeMount:function(){
        
        //console.log('beforeMount：虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取 ,接下来开始render，渲染出真实dom')
        
    },
    // render:function(createElement){
    //     console.log('render')
    //     return createElement('div','hahaha')
    // },
    mounted:function(){
      
      this.getCoinList("huobi");//获取币种列表信息 - - huobi
      this.getCoinListBinance("binance");//获取币种列表信息 - - binance
      this.getCoinListOkex("okex");//获取币种列表信息 - - okex
      this.getCoinListGate("gate");//获取币种列表信息 - - gate
      this.getMonitorAction();
      this.getCoinmarketcaplist();
      this.testNet();
  
   
     
      //showOnline:false;//数据监测原点 - - 在线
      //showOffline:true;//数据监测原点 - - 离线
      console.log("10..");
      new TradingView.widget({
        "width": 818,
        "height": 600,
        "symbol": "HUOBI:BTCUSDT",
        "timezone": "exchange",
        "theme": "Light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "range": "ytd",
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "no_referral_id": true,
        "container_id": "tradingview_51cda"
      });
      //console.log('mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了')
      //console.log('可以在这里操作真实dom等事情...') 
      //    this.$options.timer = setInterval(function () {
      //        console.log('setInterval')
      //         this.msg+='!'  
      //    }.bind(this),500)

      var echarts = require('echarts'); // 引入 ECharts 主模块
      var echarts = require('echarts/lib/echarts');// 引入柱状图
      require('echarts/lib/chart/bar');// 引入提示框和标题组件
      require('echarts/lib/component/tooltip');
      require('echarts/lib/component/title');
      
      var myChart = echarts.init(document.getElementById('main'));// 基于准备好的dom，初始化echarts实例
      // 绘制图表
      var option = option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
      myChart.setOption(option);
    },
    beforeUpdate:function(){

            //这里不能更改数据，否则会陷入死循环
           //console.log('beforeUpdate:重新渲染之前触发')
            //console.log('然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染')         
    },
        updated:function(){
         
            //这里不能更改数据，否则会陷入死循环
            //console.log('updated:数据已经更改完成，dom也重新render完成')
        },
        beforeDestroy:function(){

            //console.log('beforeDestory:销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...')
            // clearInterval(this.$options.timer)
        },
        destroyed:function(){
            //console.log('destroyed:组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后')
        }

 }

</script>

<style lang="less" scoped>

 /*
 .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  */
  .testNet{
    position: absolute;
    top: 10px;
    left: 130px;
    width: 100px;
    height: 50px;
    font-size: 0.8em;
    color: #924846;
  }
  .onOffImg{
    position:absolute;
    top:23px;
    left:150px;  
    width:20px;
    height:20px;
    
  }
  .switch_span{
    position:absolute;
    top:15px;
    right:250px;
    width: 90px;
  }
  .grid-content {
    border-radius: 4px;
    min-height:580px;
  }
  .m-bg{
    background: #e5f2f0;
  }
  #coinMarketDiv{

  }
  .top-bg-first{
    min-height:18px;
    background:rgb(51, 51, 51);
  }
  .top-bg-next{
    min-height:76px;
  }
  .top-next-card{
    width: 100%;
    height:71px;
  }
  #el-icon-setting-img{
    position:absolute;
    top:10px;
    right:30px;

  }
  #searchInput{
    position:absolute;
    right:66px;
  }
  .topLogo{
    position:absolute;
    left:25px;
    top:-25px;
    height:78px;
  }
  .is-selected {
    color: #1989FA;
  }
  .addNotes{
    width: 45px;
    height:45px;
  }
  .foot-bg{
    height:50px;
  }
  .updatetime-box-card{
    width:125px;
    height:18px;
    position:absolute;
    top:15px;
    right:15px;
    z-index:2;
  }
  .updatetime-span{
    font-size:2px;
    position:absolute;
    top:0px;
    right:0px;
  }
  .coinmarketcaplist-content{
    height:65px;
  }
  .updatetime-coinmarketcaplist{
    position:absolute;
    right:5em;
    font-family: "Helvetica Neue";
  }
  .updatetime-coinmarketcaplist-h{
    
    font-family: "Microsoft YaHei";
  }
  .bottom-font{
    text-align:center;
    font-family:Arial;
    font-size:1px;
  }
  .wifiImg{
    width:2em;
    height:2em;
  }
  .el-tag--success {
    background-color: #fff!important;
    border-color: #fff!important;
    color: #13ce66;
}
.el-tag--danger {
    background-color: #fff!important;
    border-color: #fff!important;
    color: #ff4949;
}

    
</style>










