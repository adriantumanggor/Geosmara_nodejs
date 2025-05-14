# version: '3.8'

# services:
#   postgres:
#     image: postgres:15-alpine
#     container_name: geos_postgres
#     environment:
#       POSTGRES_USER: ${POSTGRES_USER:-admin}
#       POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secret}
#       POSTGRES_DB: ${POSTGRES_DB:-mydb}
#     volumes:
#       - postgres_data:/var/lib/postgresql/data
#       - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql:Z
#     ports:
#       - "5432:5432"
#     networks:
#       - geos-network

#   pgadmin:
#     image: dpage/pgadmin4
#     container_name: geos_pgadmin
#     environment:
#       PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL:-admin@example.com}
#       PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-secret}
#     volumes:
#       - pgadmin_data:/var/lib/pgadmin
#     ports:
#       - "5050:80"
#     networks:
#       - geos-network
#     depends_on:
#       - postgres

#   app:
#     build: .
#     container_name: geos_app
#     volumes:
#       - .:/app:Z
#       - /app/node_modules
#     ports:
#       - "3000:3000"
#     environment:
#       - NODE_ENV=development
#       - DATABASE_URL=postgres://${POSTGRES_USER:-admin}:${POSTGRES_PASSWORD:-secret}@postgres:5432/${POSTGRES_DB:-mydb}
#     networks:
#       - geos-network
#     depends_on:
#       - postgres

# volumes:
#   postgres_data:
#   pgadmin_data:

# networks:
#   geos-network:
#     driver: bridge# Geosmara_nodejs
