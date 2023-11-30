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
