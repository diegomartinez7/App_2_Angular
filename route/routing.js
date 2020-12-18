const heroes = require("../controller/heroes.controller.js");
var router = require("express").Router();

// GET Methods

// GET All
router.get("/heroes", heroes.findAll);

// GET by ID
router.get("/heroe/:id", heroes.findOne);

// GET by Term
router.get("/heroesTerm", heroes.findSome);

// GET Active
router.get("/heroesAct", heroes.findActive);

// POST Heroe
router.post("/heroe", heroes.create);

// PUT Heroe
router.put("/heroe/:id", heroes.update);

//Delete Heroe
router.delete("/heroe/:id", heroes.delete);

module.exports = router;