const mysql = require(__basename + '/library/mysql/mysql.js');

class Service {
	constructor(){}

	query (sql) {
		return mysql.query(sql);
	}
}

module.exports = new Service();