"use strict";

const express = require("express");
const router = express.Router();
const appLib = require('../../lib/appLib');
const { check, validationResult } = require('express-validator/check');

// load the ad model
const Anuncio = require("../../models/Anuncio");

// GET 
// the ads list

// getting the results with async/await
router.get("/", async (req, res, next) => {

try {
  const docs = await Anuncio.find().exec();
  res.json({ success: true, result: docs});
} catch (err) { 
  next(err);
  return;
}

});

// POST 
// at the ads list

router.post("/", [], async (req, res, next) => {
 console.log(req.body);

 try {
 const data = req.body;

 // creamos documento en memoria
 const anuncio = new Anuncio(data);

 // guardamos documento en bbdd y se devuelve un json de dicho archivo
 const anuncioGuardado = await anuncio.save(anuncio);

 res.json({ success: true, result: anuncioGuardado });
 
 res.status(201);

} catch (err) {
  return next(err);
}

});

module.exports = router;