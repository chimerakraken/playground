.PHONY: dev build start lint

dev:
	yarn run dev

build:
	yarn run build

start:
	yarn run start

lint:
	yarn run lint

format:
	yarn prettier --write .