IMAGE_NAME=nestjs-example

# Set environment variable(s) to allow for multiple containers [e.g. export CONTAINER_NAME_WORKER_SUFFIX=_d]
CONTAINER_NAME_WORKER:=nestjs-dev-worker$(CONTAINER_NAME_WORKER_SUFFIX)

CONTAINER_NAME_SERVICE:=nestjs-prod-service$(CONTAINER_NAME_SERVICE_SUFFIX)

CONTAINER_NAME_POSTMAN:=postman-newman-test-api$(CONTAINER_NAME_POSTMAN_SUFFIX)

WORKER=docker-compose run --name $(CONTAINER_NAME_WORKER) --service-ports --rm worker
SERVICE=docker-compose run --name $(CONTAINER_NAME_SERVICE) --service-ports --rm nestjs-example-api
POSTMAN=docker-compose run --name $(CONTAINER_NAME_POSTMAN) --service-ports --rm postman-newman

YARNPKG=

# Tell Make, that these are commands, not files. This is needed when there're files with the same name.
# Based on: https://stackoverflow.com/questions/2145590/what-is-the-purpose-of-phony-in-a-makefile
.PHONY: install add build test dev debug lint audit clean sweep

install:
	$(WORKER) make _install

_install:
	yarn install

# Adds a NPM package (to package.json and yarn.lock)
add: 
	$(WORKER) make _add YARNPKG=$(YARNPKG)

_add:
	if test -z ${YARNPKG}; then \
		echo "No package provided."; \
		echo "Usage/example: make add YARNPKG=typescript"; \
	else \
		yarn add $(YARNPKG); \
	fi

build:
	$(WORKER) make _build

_build:
	yarn build

test:
	$(WORKER) make _test

_test:
	yarn test

dev:
	$(WORKER) make _dev

_dev:
	yarn start:dev

debug:
	echo $(CONTAINER_NAME_WORKER_SUFFIX)
	echo $(CONTAINER_NAME_WORKER)
	$(WORKER) make _debug

_debug:
	yarn start:debug

lint:
	$(WORKER) make _lint

_lint:
	yarn lint

audit:
	$(WORKER) make _audit

_audit:
	yarn audit

# Postman / Newman Test API
test_api:
	$(POSTMAN) run nestjs.postman_collection.json --environment=nestjs.postman_environment.json --reporters cli, junit --reporter-junit-export="newman-report.xml"

# Starts Mongo Express (Web Based Mongo Admin Interface)
mongo_express:
	docker-compose up -d mongo-express

# Builds a production container. You can change via the IMAGE_NAME var.
# e.g. make build_container IMAGE_NAME=my-container
build_container:
	docker build --target production -t $(IMAGE_NAME) .

# Build / Re-build the Service (production)
build_service:
	docker-compose build nestjs-example-api

# Build / Re-build the Worker (development)
build_worker:
	docker-compose build worker

# Starts the app in a prod container. Uses env vars from .env
start_container:
	$(SERVICE)

# Opens a shell to the app's prod container. Uses env vars from .env
debug_container:
	$(SERVICE) /bin/sh

# Shuts down all docker-compose instances & cleans the local images.
# Based on https://vsupalov.com/cleaning-up-after-docker/
clean:
	docker-compose down --rmi local --remove-orphans

# Shuts down all docker-compose instances, volumes, deletes images etc.
# This will make subsequent 3M runs significantly slower
sweep:
	docker-compose down -v --rmi all --remove-orphans
	# docker system prune
