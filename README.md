# Nnergix Test _(Backend Developer)_

## Índice 🌴

✨ [Descripción del proyecto](#descripción)

✨ [Preparar el proyecto](#preparar-el-proyecto)

✨ [¿Cómo funciona?](#cómo-funciona)

✨ [API Documentation](#api-documentation)

✨ [Mejoras](#mejoras)

---

## Descripción

Desarrollar una aplicación que introduciendo una URL de una página web devuelva todos los links que aparecen en ella con un formato de salida opcional.

### Requisitos

- Inputs requeridos:

  - Mediante un entrypoint en una API REST.
  - Mediante un comando que se pueda ejecutar en un docker.

- Entorno docker donde se puedan ejecutar ambos inputs.

- Tests que se consideren necesarios.

- Descripción en texto de los cambios y mejoras que se realizarían en caso de tener tiempo para ello.

### Extras valorables:

- Guardar histórico de llamadas en alguna base de datos _(o otros conceptos opcionales que se crean convenientes)_.

- Documentación de la API.

- Legacy Code.

- Descripción escrita del diseño de la arquitectura de sistemas que servicios que sería necesario para alojar esta aplicación en un servicio cloud _(deseable AWS)_.

---

## Preparar el proyecto

Antes de nada, necesitaremos tener instalado **Git** y **Docker/Docker-Compose** y es recomendable **MongoDB Compass** para checkear de manera sencilla la base de datos.

Para preparar el proyecto tendremos que ir hasta el [repositorio en github](https://github.com/RealNarukyn/Nnergix-test) donde se encuentra.
Una vez allí podremos descargar un .zip con el código o podemos clonarlo en nuestra propia PC.

Para clonarlo simplemente nos moveremos al directorio de nuestra PC donde queramos clonarlo y escribiremos en una terminal lo siguiente:

```sh
git clone https://github.com/RealNarukyn/Nnergix-test.git
```

---

## Cómo funciona

Entramos al directorio creado al clonar el proyecto _(nnergix-test)_. Tenemos 3 formas de ejecutar el programa:

- **TEST**

  Si queremos correr los test en el servidor tendremos que primero instalar las dependencias del proyecto, por tanto:

  ```sh
  npm i or npm install
  ```

  Una vez instaladas, podemos correr:

  ```sh
  npm run test
  ```

- **SERVIDOR**

  ```sh
  docker-compose up
  ```

  Si es la primera vez que se ejecuta, se encargará de buildear el proyecto y arrancará tanto el servidor como la base de datos.

  Esto funcionará como un servidor normal de express, levantando el [Server API](##APIDocumentation).

- **COMANDO**

  ```sh
  DOCKER_URL=https://google.com,https://coinmarketcap.com docker-compose up
  ```

  Le pasaremos a través de la variable de entorno **DOCKER_URL** la cantidad de url's de las que queramos extraer información _(siempre separadas por comas)_.

  Ejecutará las llamadas correspondientes y para devolver los links pedidos y almacenarlos en la DB.

---

## API Documentation

Se trata de una API sencilla en la cual tenemos 3 endpoints.

- **GET /**  
   _http://localhost:3000_

  Un sencillo GET que nos indicará si el servidor está o no corriendo.

- **POST /link**  
   _http://localhost:3000/link_

  Un post que se encargará de almacenar en la Base de Datos y devolver los links que obtengamos de la url pasada a través de un json con la siguiente estructura:

  ```json
  { "url": "https://coinmarketcap.com" }
  ```

- **DELETE /collections**  
  _http://localhost:3000/collections_

  No creo que sea necesario usarlo, pero en caso de querer borrar los datos almacenados, podremos hacer una request a este endpoint y borrar todas las **collections** de la Base de Datos.

---

## Mejoras

- **Mejorar la estructuración del archivo server.ts**

  Siento que se podría organizar mejor el tema de ejecutarlo como Comando o como Servidor. Quizá aislando funcionalidades o con un mejor uso de los condicinales...

- **Mejorar la llamada POST**

  Añadir la opción de poder aceptar más url´s como en el caso de usar el programa como comando.

- **Blindar el endpoint DELETE /collections**

  Este endpoint existe porque lo utilicé al realizar pruebas, pero en caso de que se mantuviese en un proyecto un endpoint como este debería estar blindado y que no lo pudiese llamar cualquiera.

- **Realizar test más complejos**

- **Una mejor configuarción de docker y docker-compose**

  Creo que para tener los conocimientos básicos de **Docker** lo hice bastante bien en cuanto a la configuración del proyecto pero seguramente sea muy mejorable.

- **Producción**

  Preparar el proyecto y todas las variables de entorno para que puedan ser ejecutadas en producción.
