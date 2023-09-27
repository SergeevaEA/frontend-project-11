install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

lint:
	nix eslint .

publish:
	npm publish --dry-run

