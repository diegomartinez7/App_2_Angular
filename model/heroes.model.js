//-------------- MODEL ---------------->
const dbConfig = require("./db.config.js");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

var heroesSchema = new mongoose.Schema({
    _id: Number,  //tal vez y Piwy dice que con Number sí xD
    nombre: String,
    bio: String,
    img: String,
    aparicion: String,
    casa: String,
    activo: Boolean
});

db.heroes = mongoose.model('heroes', heroesSchema, 'heroes');
module.exports = db;