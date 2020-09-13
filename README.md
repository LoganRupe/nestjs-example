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
- [Tools used / Useful links](#-tools-used-/-useful-links)

## About

This is a NestJS example used as a testing area.

This is built with (`RestJS`, `Fastify`, `Yarn`, `Typescript`, `Docker`).

## Local Development
NOTE: Best to use Docker/3M for development. See: [Docker 3M Development (preferred)](#docker-3m-development-preferred)

To run locally:

1. Clone this repo

```
git clone https://github.com/LoganRupe/nestjs-example
```

2. Build using the following commands

```bash
nvm install #or nvm use
yarn install
yarn debug
```

## Project Structure

````
* /.vscode                                  # VS Code Settings

* /assets           
* /assets/nestjs.postman_collection.json    # Postman collection for testing API

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
* /.env                                     # Environment variables used for Docker
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

To run (uses make to use Docker):

1. Clone this repo

```
git clone https://github.com/LoganRupe/nestjs-example
```

2. Build using the following commands

```bash
make install
make debug
```

### Build production container

Run the following commands:

```
make build_container
```

## Tools used / Useful links
 - [NestJS](https://nestjs.com) - a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
 - [Fastify](https://www.fastify.io/) - a fast and low overhead web framework, for Node.js.
 - [TypeScript](https://www.typescriptlang.org) - an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.
 - [Yarn](https://classic.yarnpkg.com) - a package manager for your code allowing you to use and share (e.g. JavaScript) code with other developers
 - [Docker](https://docs.docker.com) - a platform for developers and sysadmins to build, run, and share applications with containers.
 - [Visual Studio Code](https://code.visualstudio.com) - a lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages.
 - [Three Musketeers](https://3musketeers.io) - a pattern for developing software in a repeatable and consistent manner leveraging Make as an orchestration tool to test, build, run, and deploy applications using Docker and Docker Compose.