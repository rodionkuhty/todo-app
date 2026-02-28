# Simple Makefile for routing_app
# Available targets:
#  dev      – start the development server
#  build    – build the production bundle
#  preview  – preview the built app
#  install  – install project dependencies
#  docker-dev-build / docker-dev-run
#  docker-prod-build / docker-prod-run

APP_NAME := todo-app
DEV_IMAGE := $(APP_NAME):dev
PROD_IMAGE := $(APP_NAME):prod

DEV_PORT := 5173
PROD_PORT := 8080

.PHONY: install dev build preview \
        docker-dev-build docker-dev-run docker-dev \
        docker-prod-build docker-prod-run docker-prod

install:
	@echo "Installing dependencies..."
	npm ci

dev:
	@echo "Starting development server..."
	npm run dev

build:
	@echo "Building production bundle..."
	npm run build

preview:
	@echo "Previewing built app..."
	npm run preview

docker-dev-build:
	@echo "Build dev docker image"
	cd containers && docker build -f dockerfile-dev -t $(DEV_IMAGE) ../.

docker-dev-run:
	@echo "Starting development server in docker"
	docker run --rm -it \
	-p $(DEV_PORT):$(DEV_PORT) \
	-e CHOKIDAR_USEPOLLING=true \
	-v "$(CURDIR)":/app \
	-v /app/node_modules \
	$(DEV_IMAGE)

docker-dev: docker-dev-build docker-dev-run

docker-prod-build:
	@echo "Build prod docker image"
	cd containers && docker build -f dockerfile-prod -t $(PROD_IMAGE) ../.

docker-prod-run:
	@echo "Starting prod nginx server in docker"
	docker run --rm -p $(PROD_PORT):80 $(PROD_IMAGE)

docker-prod: docker-prod-build docker-prod-run

