import db from '../db';
import dbhelper from './dbhelper';

module.exports.price=function(collection,obj,cb){


	dbhelper.find(collection,obj,function(mas,err){

		if (!err && mas && mas[0]!==undefined) {cb(mas)}else{console.log(err);return ; }
		
	})	
	
}


