//-------------- CONTROLLER ---------------->

const db = require("../model/heroes.model.js");
const Heroe = db.heroes;

// CREATE Operation
exports.create = (req, res) => {
    //Validar petición
    if(!req.body){
        req.status(400).send({ message: "El contenido de la petición no puede estar vacío" });
        return;
    }

    Heroe.findOne().sort({ _id: -1 }).then(data => {
        var aux = parseInt(data._id)+1;  //o data._id para usar _id en postman y no id

        //Crear Heroe
        const heroe = new Heroe({
            _id: aux,  //si lo tenemos en Number (checar lo de Int32Array), y aux.toString() si lo cambio a String
            nombre: req.body.nombre,
            bio: req.body.bio,
            img: req.body.img,
            aparicion: req.body.aparicion,
            casa: req.body.casa,
            activo: true
        });
        
        heroe.save().then(data => {
            res.send(data);
        }).catch(err => {
            //req.status(500).send({ message: err.message || "Ocurrió un error" });
            throwError(res,err);
        });
    });
};

// READ Operations
exports.findAll = (req, res) => {
    Heroe.find().then(data => {
        res.send(data);
    }).catch(err => {
        throwError(res, err);
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id; //recibido como string, modificar de ser necesario para el Number o cambiar tipo en BD

    Heroe.findById(id).then(data => {
        if(!data)
            res.status(404).send({ message: `No se encontró elemento con id: ${id}` });
        else
            res.send(data);
    }).catch(err => {
        throwError(res, err);
    });
};

exports.findSome = (req, res) => {
    const termino = req.query.termino;
    var query = termino ? { nombre: { $regex: new RegExp(termino), $options: "i" }, activo: true } : {};
    Heroe.find(query).then(data => {
        res.send(data);
    }).catch(err => {
        throwError(res, err);
    });
};

exports.findActive = (req, res) => {
    Heroe.find({ activo: true }).then(data => {
        res.send(data);
    }).catch(err => {
        throwError(res, err);
    });
};

// UPDATE Operations
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "La petición no puede estar vacía"
        });
    }
    
    const id = req.params.id; //recibido como string, modificar de ser necesario para el Number o cambiar tipo en BD

    Heroe.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if(!data){
            res.status(404).send({
                message: `No se pudo actualizar el Héroe con id = ${id}`
            });
        }
        else
            res.send({ message: "Héroe actualizado correctamente" });
    }).catch(err => {
        throwError(res, err);
    });
};

// DELETE Operation
exports.delete = (req, res) => {
    const id = req.params.id;  //recibido como string, modificar de ser necesario para el Number o cambiar tipo en BD

    Heroe.findByIdAndUpdate(id, { activo: false }, { useFindAndModify: false }).then(data => {
        if(!data)
            res.status(404).send({ message: `No se pudo actualizar el Héroe con el id = ${id}` });
        else
            res.send({ message: "Héroe removido correctamente" });
    }).catch(err => {
        throwError(res, err);
    });
};

//Utils
function throwError(res, err){
    res.status(500).send({ message: err.message || "Ocurrió un error en el web server" })
}