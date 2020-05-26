FROM mongo:latest

WORKDIR /
COPY ./data/db ./data/db
COPY ./mongo/init/ ./docker-entrypoint-initdb.d/
