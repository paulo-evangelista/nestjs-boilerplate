DOCKER_COMPOSE_FILE := "infra/docker/docker-compose.dev.yaml"

# List all the commands
list:
	just --list

# Check code linting and type checking
[group('Development')]
lint:
	pnpm eslint src --fix

# Format the code
[group('Development')]
format:
	pnpm prettier --write .

# Rebuild the docker image and start the compose
[group('Docker Compose')]
rebuild:
	docker compose -f {{DOCKER_COMPOSE_FILE}} down
	docker compose -f {{DOCKER_COMPOSE_FILE}} build --no-cache --force-rm

# Start the compose
[group('Docker Compose')]
up:
	docker compose -f {{DOCKER_COMPOSE_FILE}} up -d --remove-orphans --build

# Show the logs of the app compose
[group('Docker Compose')]
log:
	docker compose -f {{DOCKER_COMPOSE_FILE}} logs -f --tail 200 app

# Stop the compose
[group('Docker Compose')]
down:
	docker compose -f {{DOCKER_COMPOSE_FILE}} down

# Show the status of the containers
[group('Docker Compose')]
status:
	docker compose -f {{DOCKER_COMPOSE_FILE}} ps

# Restart the compose
[group('Docker Compose')]
restart:
	docker compose -f {{DOCKER_COMPOSE_FILE}} restart

# delete containers
[group('Docker Compose')]
delete:
	docker compose -f {{DOCKER_COMPOSE_FILE}} down -v

# Seed the database
[group('Database')]
seed:
	docker compose -f {{DOCKER_COMPOSE_FILE}} exec app npx typeorm seed:run
