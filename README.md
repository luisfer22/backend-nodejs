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

## Clase 7 - JWT (Json web tocken) gestion de acceso

JWT, que significa JSON Web Token, es un estándar abierto (RFC 7519) que define una forma compacta y autónoma de transmitir información entre dos partes como un objeto JSON. Este token puede ser verificado y confiado porque está firmado digitalmente. JWT se utiliza comúnmente para autenticación y autorización en aplicaciones web y servicios.

**Características clave de JWT:**

1. **Formato Compacto:** JWT utiliza un formato compacto y seguro para transmitir la información entre las partes.

2. **Estructura Basada en JSON:** La información en un JWT se representa como un objeto JSON, lo que lo hace fácilmente legible y manipulable.

3. **Firmado Digitalmente:** Puede ser firmado digitalmente para verificar la integridad de los datos y la autenticidad del emisor.

4. **Tres Partes:** JWT se compone de tres partes: el encabezado (`header`), la carga útil (`payload`), y la firma (`signature`).

   - **Encabezado (`header`):** Contiene información sobre cómo se realiza la firma.
   - **Carga Útil (`payload`):** Contiene la información que se va a transmitir.
   - **Firma (`signature`):** Se utiliza para verificar que el remitente del token es quien dice ser y para asegurar que la carga útil no haya sido modificada en el camino.

5. **Base64URL Encoding:** Las tres partes del JWT se codifican en Base64URL, lo que proporciona una representación compacta y segura.

**Uso común de JWT:**

- **Autenticación:** Después de que un usuario se autentica, un servidor genera un JWT que contiene información sobre ese usuario. Este token se envía al cliente y se incluye en las solicitudes subsiguientes para autenticar al usuario.

- **Autorización:** Además de la autenticación, los JWT también se pueden utilizar para transmitir información sobre los permisos y roles del usuario, lo que permite la autorización en la aplicación.

**Ejemplo de JWT:**

```jwt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Este JWT se compone de tres partes:

- Encabezado: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- Carga Útil: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`
- Firma: `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

## Clase 8 - Autenticacion registro

Creando alternamente una table especifica para las contraseñas, que sera auth.

## Clase 9 - Autenticación login

No guardar la contraseña en limpio, es bueno delegar las contraseñas a terceros como google, en este punto necesitaremos `jsonwebtoken` para crear la llave.

### Aportes personales

1. Primero es que el login se crea en la ruta auth.
2. Que cuando se crea un usuario realmente se esta es registrando, por lo que seria mejor cambiar el nombre de esta funcion a regitrar.
3. Que solo puede crear el token si esta registrado ya el usuario en cuestion.

## Clase 10 - Autenticación: cifrar contraseñas

Cifrando contraseñas con `bcrypt` una de las librerias mas usadas para la encriptacion, recordar que cada vez que se llama a la función no importando que la contraseña sea la misma dara un hash diferente, es muy "facil" por que solo usamos dos funciones del modulos los cuales son:

1. Para crear el hash encriptado: `bcrypt.hash(password, length of hashed password)`.
2. Para comparar la contraseña y el hash guardado `bcrypt.compare(password, encrypted password)`.
3. La funcion `compare` retorna una promesa.


## Clase 11 & 12 - Autenticacion: Gestion de permisos y comprobar verificacion de tokens

### Lecciones aprendidas

1. Importante tener en cuenta los middlewares deben tener los `next()` cuando termine una condicion la que sea.
2. Crear de un json con contraseñas, otro archivo usando bcrypt encryptandolas, y luego cambiando el objeto obtenido y actualizando a la contraseña, utilizando `Promises.all`.

## Clase 13 - Manejo avanzado de errores

En esta clase el Profe Carlos nos enseña como manejar los errores que muestras mucha información y por esto pueden haber vulnerabilidades

1. Creamos un middleware que maneje los errores.
2. Se implementa un manejo de errores con su mensaje y el  `status code`.
3. Ahora que tenemos el middleware en uso, podemos quitar los `response.error` del catch y cambiar las funciones a ser un middleware con su respectivo `next` ahora en el catch cambiamos tambien por `next`, con esto el middleware se encargara de la presentacion del error.
