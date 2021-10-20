const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const connect_db = require("./db/config");
const Alumno = require("./models/Alumno");

dotenv.config();

const PORT = process.env.PORT || 5000;

connect_db();

app.use(cors());
app.use(express.json());

app.post("/algoritmia/alumnos", async (req, res) => {
	try {
		const alumno = new Alumno({
			clave: req.body.clave,
			nombres: req.body.nombres,
			apellidos: req.body.apellidos,
			carrera: req.body.carrera,
			semestre: req.body.semestre,
			comidaFavorita: req.body.comidaFavorita,
		});

		await alumno.save();
		return res.status(200).send("Alumno saved");
	} catch (error) {
        console.log(error);
		return res.status(500).send("Server error");
	}
});

app.get("/algoritmia/alumnos/:clave", async (req, res) => {
	try {
		const alumno = await Alumno.findOne({
			clave: req.params.clave,
		});
		if (alumno) {
			return res.status(200).send(alumno);
		}
		return res.status(404).send("Alumno not found");
	} catch (error) {
		return res.status(500).send("Server error");
	}
});

app.put("/algoritmia/alumnos/:clave", async (req, res) => {
	try {
		await Alumno.findOneAndUpdate(
			{
				clave: req.params.clave,
			},
			{
				clave: req.body.clave,
				nombre: req.body.nombre,
				apellidos: req.body.apellidos,
				carrera: req.body.carrera,
				semestre: req.body.semestre,
				comidaFavorita: req.body.comidaFavorita,
			}
		);

		return res.status(200).send("Alumno updated successfuly");
	} catch (error) {
		return res.status(500).send("Server error");
	}
});

app.delete("/algoritmia/alumnos/:clave", async (req, res) => {
	try {
		await Alumno.findOneAndDelete({
			clave: req.params.clave,
		});

		return res.status(200).send("Alumno deleted successfuly");
	} catch (error) {
		return res.status(500).send("Server error");
	}
});

app.listen(PORT, () => {
	console.log(`Listening on port :${PORT} => http://localhost:${PORT}`);
});
