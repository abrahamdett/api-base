# REST API - NodeJS - Express - MariaDB - Sequelize - JWT - Bcrypt

_Este es un proyecto personal con el objetivo de que desarrolladores primerizos les ayude a crear una REST API completa con usuarios, roles, módulos y permisos, la igual que protecciones a sus rutas con base al módulo donde está haciendo la petición, al igual incluye un CRUD con validaciones del token de JWT, rol, módulo y permiso._

## Comenzando 🚀

_A continuación te mencionaré las configuraciones básicas para el despliegue._


### Pre-requisitos 📋

_Mencionaremos algunos requisitos para poder desplegar el proyecto en tu entorno local:_

_1º_
```
Tener instalado NodeJS
```

2º
```
Tener instalado MariaDB o en su defecto MySQL (no se ha probado con otros motores de base de datos). En caso de no tenerlo con tener XAMPP o WAMPP instalado es suficiente.
```

3º
```
Tener instalado Postman para hacer las pruebas de las rutas.
```

4º
```
Tener instalado Git para clonar el proyecto.
```

5º
```
Tener instalado Visual Studio Code o cualquier otro editor de código.
```

6º
```
Conocimientos básicos de JavaScript, NodeJS, Express, MariaDB, Sequelize, JWT, Bcrypt.
```

7º
```
Crear una base de datos en MariaDB con el nombre de "restapi" o con tu nombre preferido.
```

### Instalación 🔧

_Para desplegar el proyecto sigue estos pasos:_

_1º_

```
Clonar el proyecto en tu entorno local con el comando: git clone 
```

_2º_

```
Abrir el proyecto en tu editor de código.
```

_3º_

```
Abrir la terminal de tu editor de código y ejecutar el comando: npm install
```

_4º_

```
Abrir el archivo /src/config.js y configurar las variables de entorno. Aquí mismo incluye las credenciales de tu base de datos.
```

_5º_

```
Abrir la terminal de tu editor de código y ejecutar el comando: npm run dev
```

_6º_

```
Abrir Postman y hacer las pruebas de las rutas.
```

_Para ejecutar una prueba envía el siguiente json a la ruta que mencionaremos en POSTMAN_

```
{
    "name": "Demo",
    "email": "demon@demo.com",
    "user": "demo",
    "password": "demo123",
    "status": 1
}
```

_En la siguiente ruta:_

```
http://localhost:3000/api/v1/auth/signup
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Nodejs](https://nodejs.org/en/) - Un entorno de tiempo de ejecución de JavaScript de back-end, se ejecuta en el motor de JavaScript V8 y ejecuta el código de JavaScript fuera de un navegador web.
* [Squelize](https://sequelize.org/) - Sequelize es un ORM moderno de TypeScript y Node.js para Oracle, Postgres, MySQL, MariaDB, SQLite y SQL Server, y más. Con un sólido soporte de transacciones, relaciones, carga ansiosa y diferida, replicación de lectura y más.
* [JSON Web Tokens](https://jwt.io/) - JSON Web Token es un estándar de Internet propuesto para crear datos con firma opcional y/o encriptación opcional cuya carga útil contiene JSON que afirma una cierta cantidad de reclamos. 
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Bcrypt es una función de hash de contraseña segura.
* [Express](https://expressjs.com/es/) - Express es un marco de aplicación web de back-end para Node.js, muy minimalista y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles.
* [MariaDB](https://mariadb.org/) - MariaDB es un sistema de gestión de bases de datos relacional de código abierto, desarrollado por la Fundación MariaDB y la comunidad de código abierto.
* [Postman](https://www.postman.com/) - Postman es una herramienta de colaboración para el desarrollo de API. Es compatible con Windows, macOS y Linux. Permite a los usuarios crear y compartir colecciones de solicitudes HTTP, así como ejecutar y probar esas solicitudes.


## Autores ✒️

**Abraham Nájera* - *Trabajo Inicial y documentación* - [abrahamdett](https://github.com/abrahamdett)

_Puedes contactarme en mi correo electrónico:_
(abraham.najera@dettsystem.com.mx)

_o en mi LinkedIn:_
(https://www.linkedin.com/in/abraham-najera/)


## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto. 📢
* Mencioname como co-autor por si usas este pequeño proyecto para tus futuros desarrollos. 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 

(https://paypal.me/vdemonkingv?country.x=MX&locale.x=es_XC)

* Da las gracias públicamente 🤓.