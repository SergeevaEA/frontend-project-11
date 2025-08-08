#develop: npx webpack serve
# команда для развертывания окружения (установки зависимостей проекта)
install:
    npm ci

#build: NODE_ENV=production npx webpack

lint:
    npx eslint .
