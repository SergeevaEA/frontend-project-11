#develop: npx webpack serve
#build: NODE_ENV=production npx webpack
# команда для развертывания окружения (установки зависимостей проекта)

install:
	npm ci

lint:
	npx eslint .

