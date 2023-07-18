import dotenv from "dotenv";

dotenv.config();

const config = {
	PORT: process.env.PORT,
	DB_HOST: process.env.HOST,
	DB_PORT: process.env.PORT,
	DB_USER: process.env.USER,
	DB_PASSWORD: process.env.PASSWORD,
	DB_DATABASE: process.env.DATABASE,
};

const incompleteConfig = Object.entries(config)
	.map(([key, value]) => [key, !!value])
	.filter(([, value]) => !value)
	.map(([key]) => [key]);

if (incompleteConfig.length >= 1) {
	throw new Error(`Missing Configuration Key or Value for: ${incompleteConfig.join(",")}`);
}

export default config;