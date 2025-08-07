const sqlite3 = require('sqlite3');

class Database {

	open_db () {
		return new sqlite3.Database(this.db_file);
	}

	async exec (sql, params = []) {
	 	const db = this.open_db();
		if (params && params.length > 0) {
			return new Promise((resolve, reject) => {
				db.run(sql, params, (err) => {
					db.close();
					if (err) reject(err);
					resolve();
				});
			});
		}
		return new Promise((resolve, reject) => {
			db.exec(sql, (err) => {
				db.close();
				if (err) reject(err);
				resolve();
			});
		});
	}
	
	
	async get_all (sql, params) {
		const db = this.open_db();
		return new Promise((resolve, reject) => {
			db.all(sql, params, (err, rows) => {
				db.close();
				if (err) reject(err);
				resolve(rows);
			});
		});
	}
	
	async get_first (sql, params) {
		const db = this.open_db();
		return new Promise((resolve, reject) => {
			db.get(sql, params, (err, row) => {
				db.close();
				if (err) reject(err);
				resolve(row);
			});
		});
	}

	constructor(db_file = "./vgorl.is.db") {
		this.db_file = db_file;	
	}
}


module.exports = Database;
