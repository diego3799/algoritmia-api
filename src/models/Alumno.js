const { Schema, model } = require("mongoose");

const AlumnoSchema = new Schema({
	nombres: {
		required: true,
		type: String,
	},
	apellidos: {
		required: true,
		type: String,
	},
	clave: {
		required: true,
		type: Number,
		unique: true,
	},
	carrera: {
		required: false,
		type: String,
	},
	semestre: {
		required: false,
		type: Number,
		default: 0,
	},
	comidaFavorita: {
		required: false,
		type: String,
	},
});
const Alumno = model("Alumno", AlumnoSchema);

module.exports = Alumno;
