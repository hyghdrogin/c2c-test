import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import requestLogger from "./utils/requestLogger.js";
import router from "./routes/index.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb"}));
app.use(requestLogger);

app.get("/",(req, res) => {
	res.send("Welcome to API Homepage");
});

app.use("/", router);
app.use((req, res) => res.status(404).send({
	error: "Invalid route",
	message: "Kindly check your route and resend your request"
}));

app.listen(port, () => {
	console.info(`Api connected on port ${port}`);
});