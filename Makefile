.PHONY: dev build start lint format add-component

# Start the development server
dev:
	yarn run dev

# Build the Next.js project for production
build:
	yarn run build

# Start the production server
start:
	yarn run start

# Run ESLint to check for code quality issues
lint:
	yarn run lint

# Format the code using Prettier
format:
	yarn prettier --write .

# Install a ShadCN UI component
# Usage: make add-component component=<component-name>
add-component:
ifndef component
	$(error "Usage: make add-component component=<component-name>")
endif
	npx shadcn@latest add $(component)