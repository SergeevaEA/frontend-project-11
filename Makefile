# Установка зависимостей
install:
	npm ci

# Запуск дев-сервера
dev:
	npm run dev

# Сборка проекта для продакшена
build:
	NODE_ENV=production npx vite build

# Просмотр сборки локально
preview:
	npm run preview

# Проверка кода линтером
lint:
	npx eslint . --ignore-pattern dist

# Очистка папки сборки
clean:
	rm -rf dist

