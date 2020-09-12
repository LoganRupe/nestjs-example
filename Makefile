IMAGE_NAME=nestjs-example

WORKER=docker-compose run --name nestjs-dev-worker --service-ports --rm worker
SERVICE=docker-compose run --name nestjs-prod-service --service-ports --rm nestjs-example-api

# Tell Make, that these are commands, not files. This is needed when there're files with the same name.
# Based on: https://stackoverflow.com/questions/2145590/what-is-the-purpose-of-phony-in-a-makefile
.PHONY: install build test dev debug lint audit clean sweep

install:
	$(WORKER) make _install

_install:
	yarn install

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
