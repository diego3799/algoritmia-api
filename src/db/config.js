const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connect_db = async () => {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log("DB connected");
	} catch (error) {
        console.log(error)
		console.error("DB connection failed");
        process.exit(1)
	}
};

module.exports = connect_db;
