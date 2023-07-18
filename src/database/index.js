import mysql from "mysql2";
import config from "../config/index.js";

const connect = () => {
	try {
		const connection = mysql.createConnection({
			user: config.DB_USER,
			host: config.DB_HOST,
			password: config.DB_PASSWORD,
			port: config.DB_PORT,
			database: config.DB_DATABASE,
			connectionLimit: 10
		});
		const table = "CREATE TABLE IF NOT EXISTS farmers(id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), phone_number VARCHAR(20), age INT, address VARCHAR(100), crops VARCHAR(100))";
		connection.query(table, () => {
			console.log("Table Created");
		});
		console.log("Database Connected");
		return connection;
	} catch (error) {
		console.error(error);
	}
};

export { connect };