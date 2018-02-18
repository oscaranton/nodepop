'use strict';

/* activamos el paquete mongoose */
var mongoose = require('mongoose');

// definición del esquema del anuncio
var anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: Number,
    foto: String,
    tags: { type: [String], index: true }
});

// método estático del modelo, obteniendo las queries sin ejecutarlas
anuncioSchema.statics.listar = function(filter, skip, limit, sort, fields, callback) {
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec(callback);
  };

// creación del modelo
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// permite acceder al modelo desde fuera del archivo
module.exports = Anuncio;