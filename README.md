# proyecto-backend-node-platzi

Proyecto del curso avanzado de backend con NodeJS

## Clase 3 - Estructura inicial del proyecto y instalacion de librerias basicas

### Usando nvmrc

- Recuerda usar en administrador el powershell para poder usar el `nvm use <version number>`
- Usando .nvmrc para saber que version tiene el proyecto y usar la version nvm
  - en windows abrimos powershell administrator
  - dentro de la terminal `Start-Process powershell -Verb RunAs`
  - regresamos a la terminal y obtenemos la dirección `pwd` para sacar la direccion actual del proyecto
  - en la terminal con administrador `cd <direccion proyecto>`
  - luego usar `nvm use $(Get-Content .nvmrc)`
- para mas informacion mirar [repositorio](https://github.com/nvm-sh/nvm)

Si estas en linux en solo usar en la carpeta del proyecto `nvm use`

### Usando node --watch en vez de nodemon

Con el comando `node --watch .\api\index.js`

### Usando Rest Client en vez de insonmia o Postman

Los archivos que terminan en .rest o .http son los que utilizan la extención del VsCode, tambien que para tener varias respuestas en un solo archivo con `### <request description>`, los request estan en la carpeta `./utils/requests/*.rest`.

## Clase 4 - Aislar el codigo de la base de datos

Primero añadimos dos scripts en package.json en `"scripts" : {}`, para correrlos usar `npm start` & `npm run start:dev`.

Ahora se creara la carpeta `./store` aqui estaran las bases de datos, en este caso creamos una base de datos en memoria llamada `dummy.js`

### Usando mockaroo

Pagina de [mockaroo](https://www.mockaroo.com/) para data fake util para pruebas

## Clase 5 - Rutas para usuarios

Añadiendo Promesas y consumiendolas, tambien desacoplando store de controller, modificando controller para que se adapte a cualquiere base de datos que en el futuro tenga que usar.

## Clase 6 - Documentando la api

Añadiendo swagger, nanoid, y bodyParser.json() que ahora esta implementada en express como `express.json()`

### Documentación de las librerias

- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger estructure](https://swagger.io/docs/specification/basic-structure/)
- [js-doc repository](https://github.com/Surnet/swagger-jsdoc/tree/v7)
- [nanoid repository](https://github.com/ai/nanoid#readme) & [nanoid npm](https://www.npmjs.com/package/nanoid)
- [Swagger Oficial Documentation](https://swagger.io/docs/specification/basic-structure/)
- [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/tree/main)
- [Editor de Swagger para tener de referencia](https://editor.swagger.io/)

### Tutoriales que ayudan mucho

- [#1](https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do)
- [#2](https://javascript.plainenglish.io/how-to-implement-and-use-swagger-in-nodejs-d0b95e765245)

### nanoid generador de id unicos y eficientes

Al instalar tuve un problema ya que estoy utilizando require *commonjs modules*, y la version 4 en adelante de nanoid solo permite usar modulesjs y por ello decidi usar la version 3 en especifico la version 3.3.7

Para mas información [nanoid changelog](https://github.com/ai/nanoid/blob/main/CHANGELOG.md)

### Aportes Personales de lo que he aprendido

1. Hay dos formas de usar swagger con archivo `swagger.json` y con jsdoc.
2. Las rutas en apis en options para inicializar swagger-jsdoc, pasaba que la ruta relativa era la raiz del proyecto y tambien el aprender que con ** para carpetas y * para archivos puede `swagger-jsdoc` usar de forma recursiva encontrar las opciones de los **METODOS HTTP** comentando y documentando a la vez, usando [node:glob](https://github.com/Surnet/swagger-jsdoc/blob/v7/docs/CONCEPTS.md).
3. [TypeScript](https://github.com/Surnet/swagger-jsdoc/blob/v7/docs/TYPESCRIPT.md)
4. Recuerda poner los midlewares de `express.json` & `express.urlencoded()` antes que el router de rutas o la ruta en si mismo, si lo pones despues es como si no existieras.
