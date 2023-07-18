import { connect } from "../database/index.js";
import { validateFarmer } from "../utils/validation/farmerValidation.js";

const connection = connect();

export const createFarmer = async(req, res) => {
	try {
		const valid = validateFarmer(req.body);
		if (valid.error) {
			res.status(400).send(valid.error.message);
		}
		const query = "INSERT INTO farmers SET ?";
		connection.query(query, req.body, () => {
			res.status(201).send({
				message: "Farmer Created Successfully",
			});
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};

export const filterFarmerDetails = async (req, res) => {
	try {
		const { property, filter } = req.query;
  
		let selectOption = "*";
		if (Array.isArray(property)) {
			if (property.includes("age") && property.includes("crops")) {
				selectOption = "age, crops";
			} else {
				selectOption = property.join(", ");
			}
		}
  
		let query = `SELECT ${selectOption} FROM farmers`;
  
		const params = [];
  
		if (filter) {
			query += " WHERE ";
			const conditions = [];
  
			for (const [key, value] of Object.entries(filter)) {
				if (key !== "crops") {
					if (key === "age") {
						if (typeof value === "number") {
							conditions.push("age = ?");
							params.push(value);
						} else if (typeof value === "object") {
							const { exact, min, max } = value;
							if (exact !== undefined) {
								conditions.push("age = ?");
								params.push(exact);
							} else if (min !== undefined && max !== undefined) {
								conditions.push("age BETWEEN ? AND ?");
								params.push(min, max);
							}
						}
					} else if (key === "phone_number") {
						const escapedValue = value.replace(/[+\-%_]/g, "\\$&");
						conditions.push("phone_number LIKE ?");
						params.push(`%${escapedValue}%`);
					} else {
						conditions.push(`${key} = ?`);
						params.push(value);
					}
				}
			}
  
			if (filter.crops) {
				const crops = Array.isArray(filter.crops) ? filter.crops : [filter.crops];
				const cropsConditions = crops.map(() => "crops LIKE ?");
				conditions.push(`(${cropsConditions.join(" OR ")})`);
				crops.forEach((crop) => params.push(`%${crop}%`));
			}
  
			query += conditions.join(" AND ");
		}
  
		const [rows] = await connection.promise().query(query, params);
		res.status(200).send({
			message: "Farmer data fetched",
			data: rows,
		});
	} catch (err) {
		console.error("Error retrieving farmers:", err);
		res.status(500).send("An error occurred while retrieving farmers");
	}
};
  
  