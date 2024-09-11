install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run 
	