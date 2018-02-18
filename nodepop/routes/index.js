/**
 * NodeAPI index router with filters
 */
'use strict';

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');
var appLib = require('../lib/appLib');

/* GET home page. */
router.get('/', async (req, res, next) => {
   
  try {
      // Get request parameters
      const nombre = req.query.nombre;
      const venta = req.query.venta;
      const tags = req.query.tags;
      const precio = req.query.precio;
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const sort = req.query.sort;
      const fields = req.query.fields;
      
      // Build filter query with parameters
      const filter = {};
    
      // Run query
      const docs = await Anuncio.listar(filter, skip, limit, sort, fields);
     
      // Query response
      res.render('index', { 
        title: 'NodePop',
        docs: docs
      });

      // Status server 204: Content not found
      if ( docs.length === 0 ) {
          res.status(204);
      }

  } catch(err) {
      return next(err);
  }
});

module.exports = router;
