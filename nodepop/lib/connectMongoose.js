'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

// comprobacion de error en conexion a base de datos
conn.on('error', err => {
    console.log('Error de conexión a la base de datos', err);
    process.exit(1);
}
);

// mensaje que se emite una vez cada vez que se arranca la base de datos
conn.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
}
);

// ruta a la base de datos
mongoose.connect('mongodb://localhost/nodepop');