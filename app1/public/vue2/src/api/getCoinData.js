
import axios from 'axios'

export const getCoinListInfo = (exType) => {

	return new Promise(resolve => {

		axios.get('http://localhost:8080/api/symbol/latestData/get?ex='+exType)

      .then(function (response) {

        resolve(response);
      })
      .catch(function (error) {

        resolve(error);
  });
});
  

};
export const getMonitorInfo = (type) => {

  return new Promise(resolve => {

    axios.get('http://localhost:8080/api/monitor/data?type='+type)

      .then(function (response) {

        resolve(response);
      })
      .catch(function (error) {

        resolve(error);
      });
  });
};

export const getCoinmarketcaplist = (type) => {

  return new Promise(resolve => {
    

    axios.get('http://localhost:8080/api/coinmarketcap/data')

      .then(function (response) {

        resolve(response);
      })
      .catch(function (error) {

        resolve(error);
      });
  });
};



