# Nodepop
Sistema de API para listar anuncios con filtro y grabación de anuncios
## Instalación
Esta app requiere de mongodb para funcionar. Está diseñado para funcionar en local. Para ejecutar por primera vez:
1. Descargar el repo `$git clone git@github.com:oscaranton/nodepop.git`
2. Entrar a la carpeta `cd nodepop`
3. Instalar `npm install`
4. Crear una base de datos en mongoose llamada `nodepop`
5. Iniciar la applicaión `npm start`
6. Abrir la URL: [localhost:3000](http://localhost:3000)
## Documentación API
GET
Listado de Productos
URL [Listado JSON de artículos](http://localhost:3000/apiv1/anuncios/)
URL [Listado HTML de artículos](http://localhost:3000/)
POST
Por elementos body
`nombre`
`tags`
`venta`
`precio`
`foto`
Dispone de una base de datos JSON para importar en la carpeta "/nodepop/onload/db-init.json" con sus correspondientes fotos en la carpeta "./public/images"