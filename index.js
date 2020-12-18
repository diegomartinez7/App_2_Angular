//-------------- CONTROLLER ---------------->

//Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Attaching routing to app server
const router = require("./route/routing.js");

var corsOptions = {
    origin: "http://localhost:8080"
}

//Inicialización de web server
const port = process.env.PORT || 3000;  //variable de ambiente
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

const db = require("./model/heroes.model.js");

//Corroboramos la url (borrar después)
console.log(db.url);

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.log("No se pudo establecer la conexión a la base de datos");
    process.exit();
});

app.get("/", (req, res) => {
    res.json({ message: "Inicio a servidor de aplicación" });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
})