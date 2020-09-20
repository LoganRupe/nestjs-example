# nestjs-example
NestJS Example - Test / Playground area

## Table of Content

- [About](#about)
- [Local Development](#local-development)
- [Docker and 3M](#docker-and-3m)
  - [Prerequisites](#prerequisites)
  - [The 3 Musketeers Commands (Make)](#the-3-musketeers-commands-make)
  - **[Docker 3M Development (preferred)](#docker-3m-development-preferred)**
  - [Build production container](#build-production-container)
- [Testing](#testing)
  - [Unit testing (with Jest)](#unit-testing-with-jest)
  - [API testing (with Postman)](#api-testing-with-postman)
- [Swagger / OpenAPI](#swagger-/-openapi)
- [Mongo](#mongo)
  - [MongoDB](#mongodb)
  - [Mongo Express (Web Admin UI)](#mongo-express-web-admin-ui)
- [Tools used / Useful links](#tools-used-/-useful-links)

## About

This is a NestJS example used as a testing area.

This is built with (`NestJS`, `Fastify`, `Yarn`, `Typescript`, `Docker`).

## Local Development
NOTE: Best to use Docker/3M for development. See: [Docker 3M Development (preferred)](#docker-3m-development-preferred)

To run locally:

1. Clone this repo:

```
git clone https://github.com/LoganRupe/nestjs-example
```

2. Set environment variables to connect to Mongo database:

```bash
export PORT=3000                                                      # The port NestJs API will run on.
export MONGO_NEST_CONNECTION_STRING=mongodb://mongo.atlasdb.net/nest  # replace variables with your mongodb connection string
export MONGO_NEST_USERNAME=nest                                       #  and credentials
export MONGO_NEST_PASSWORD=ExampleNestPassword123                     # NOTE: Docker 3M Development section provides a functioning MongoDB
```

3. Build using the following commands:

```bash
nvm install # or nvm use
yarn install
yarn debug
```

## Project Structure

````
* /.vscode                                  # VS Code Settings

* /assets           
* /assets/nestjs.postman_collection.json    # Postman collection for testing API
* /assets/mongo/dump                        # Docker Volume for Mongo Database Data Pumps exports [git ignored]
* /assets/mongo/scripts/                    # Shell scripts used in custom Mongo Docker image for Auth

* /src
* /src/cats                                 # Cats Module
* /src/common
* /src/common/auth                          # Authentication / Authorisation Module
* /src/common/...

* /src/core/...
* /src/app.controller.ts                    # Root Controller
* /src/app.controller.spec.ts               # Root Controller Test
* /src/app.module.ts                        # Root Module

...
* /.dockerignore                            # Files/Folders to ignore when Dockerizing directory
* ./docker-compose.yml                      # Orchestration for Development Docker containers/services
* ./Dockerfile                              # Docker image(s) instructions set
...

* /package.json
* /README.md                                # This file
...           
````

## Docker and 3M

### Prerequisites

On Windows or Mac, make sure you have installed: 
[Docker](https://docs.docker.com/get-docker).


### The 3 Musketeers Commands (Make)

You can use the following [3 Musketeers](https://3musketeers.io) Make commands to build, test, and run the containerised app:

```bash
# Runs common CI/CD commands
make install
make build
make test
make dev
make debug
make lint

# Adds a NPM package (to package.json and yarn.lock)
make add YARNPKG=typescript

# Builds a prod container locally. You can omit IMAGE_NAME
make build_container IMAGE_NAME="<your-image-name>"

# Builds and runs a prod container. Uses the .env vars
# Visit http://localhost:3000/health
make start_container

# Builds prod container and opens a shell. Uses the .env vars
make debug_container

# Cleans up any left over containers containers
make clean

# Cleans up left over containers, images, and volumes.
# This will make subsequent 3M runs much slower
make sweep
```

The 3M approach allows you to replicate locally, build-server/production behaviour. Running commands like `make test`,
`make build`, etc starts the same container image and process as buid-server stages.

### Docker 3M Development **(preferred)**

To run (uses **make** to use Docker).

1. Clone this repo:

```
git clone https://github.com/LoganRupe/nestjs-example
```

2. Create environment variables file (`.env`):

```bash
touch .env
```

3. Place below content in `.env` file:

```bash
# Common Docker Environment Variables
PORT=3000
DEBUG_PORT=9229
MONGO_EXPRESS_PORT=8081

MONGO_ADMIN_USERNAME=admin
MONGO_ADMIN_PASSWORD=ExampleAdminPassword123          # !Please change to some other password!

MONGO_NEST_CONNECTION_STRING=mongodb://mongo/nest     # This maps to the Mongo container orchestrated in docker-compose,
MONGO_NEST_DATABASE=nest                              #  change to another connection string and credentials if you have
MONGO_NEST_USERNAME=nest                              #  another MongoDB available.
MONGO_NEST_PASSWORD=ExampleNestPassword123            # !Please change!

MONGO_EXPRESS_USERNAME=express
MONGO_EXPRESS_PASSWORD=ExampleExpressPassword123      # !Please change!
```
NOTE: The `.env` file is not checked in due to .gitignore.

ALSO NOTE: These variables are not commited by default for security reasons (note: You could make this file available to your build pipelines securely).

4. Build using the following commands:

```bash
make install
make debug
```

### Build production container

To build a production NestJS Example container run the following commands:

```
make build_container
```

## Testing

All testing is available through the use of [3 Musketeers](https://3musketeers.io) Make commands to test the containerised app.

### Unit testing (with Jest)

Unit testing is done with the [Jest](https://jestjs.io) framework.

Run unit tests using the following command:

```bash
make test
```

### API testing (with Postman)

API Testing is done using [Postman](https://www.postman.com). The test collection and environment files can be found in the [./assets/postman](https://github.com/LoganRupe/nestjs-example/tree/master/assets/postman) directory.

Run API tests using the following steps:

1. Run the following command to start a production container.

```bash
make start_container
```

2. Run the following command to start a newman container to run the Postman test collection.

```bash
make api_test
```

## Swagger / OpenAPI
The [OpenAPI](https://swagger.io/specification/) specification (formerly Swagger) is a language-agnostic definition format used to describe RESTful APIs.

Example API makes available an OpenAPI/Swagger document on:

- [http://localhost:3000/api]()

The OpenAPI document is set through the use of attributes and documentation (through: Controllers, Schemas and DTOs) and built with (`@nestjs/swagger`, `fastify-swagger`).

## Mongo

### MongoDB

MongoDB is provided as a container for development purposes (This is a slightly customised container providing auth, see  `Dockerfile` based on [docker-mongo-auth](https://github.com/aashreys/docker-mongo-auth) written by Aashrey Sharma). 

To **NOT** use the provided container comment out the below lines in the `docker-compose.yml` *nestjs-example-api* and *worker* sections:

```
  depends_on:
      - mongo
```

NOTE: The MongoDB port is not exposed outside of the ***nestexnet*** docker network. 

To connect to MongoDB externally on port 27017, uncomment the below lines in the `docker-compose.yml` *mongo* section:

```
  #ports:           # Uncomment to expose MongoDB
  #  - 27017:27017
```

### Mongo Express (Web Admin UI)

Mongo Express is available as a container for easier Mongo administration. To Use:

1. Start the Mongo Express container

```bash
make mongo_express
```

2. Visit the Mongo Express website on: [http://localhost:8081]() NOTE: The credentials to login will be whatever you set the environment variables in `.env` to for ***MONGO_EXPRESS_USERNAME*** and ***MONGO_EXPRESS_PASSWORD***.

## Tools used / Useful links
 - [NestJS](https://nestjs.com) - a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
 - [Fastify](https://www.fastify.io/) - a fast and low overhead web framework, for Node.js.
 - [TypeScript](https://www.typescriptlang.org) - an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.
 - [Yarn](https://classic.yarnpkg.com) - a package manager for your code allowing you to use and share (e.g. JavaScript) code with other developers
 - [Docker](https://docs.docker.com) - a platform for developers and sysadmins to build, run, and share applications with containers.
 - [Visual Studio Code](https://code.visualstudio.com) - a lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages.
 - [Three Musketeers](https://3musketeers.io) - a pattern for developing software in a repeatable and consistent manner leveraging Make as an orchestration tool to test, build, run, and deploy applications using Docker and Docker Compose.
 - [MongoDB](https://www.mongodb.com/) - a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
 - [Mongo Docker](https://hub.docker.com/_/mongo) - official image (used in `Dockerfile` and customised to provide authentication).
 - [Postman Docker](https://hub.docker.com/r/postman/newman/) - official Postman/newman image. [Postman](https://www.postman.com) is an API testing tool.