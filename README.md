# Tesela

[![CI](https://github.com/jrs407/Tesela/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jrs407/Tesela/actions/workflows/ci.yml)
![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&logoColor=white)

Aplicación monolítica con backend en Java (Spring Boot), frontend en Angular y base de datos MongoDB.

## Estructura

```
Tesela/
├── backend/     # Spring Boot (API REST)
├── frontend/    # Angular (SSR)
├── mongo/init/  # Scripts de inicialización de MongoDB
├── docker-compose.yml
└── docker-compose.dev.yml
```


### Backend (monolito modular)

```
com.tesela
├── config/          # Configuración global (CORS, ...)
├── common/          # Código transversal (excepciones, utilidades)
└── modules/
    └── <modulo>/    # Un paquete por módulo de negocio
        ├── api/            # Controllers REST + DTOs
        ├── application/    # Casos de uso (API pública del módulo)
        ├── domain/         # Modelo y reglas de negocio
        └── infrastructure/ # Repositorios MongoDB, integraciones
```

Reglas: `api → application → domain`; `infrastructure` implementa puertos del dominio; un módulo solo usa
la capa `application` de otro, nunca su `domain` ni `infrastructure`. `modules/example` es la plantilla a copiar.

### Frontend (una feature por pestaña)

```
src/app/
├── core/       # Singletons: interceptors, guards, servicios globales
├── shared/     # Componentes, pipes y modelos reutilizables
├── layout/     # Shell (navegación por pestañas)
└── features/
    └── <feature>/   # Una pestaña = una feature con rutas lazy (<feature>.routes.ts)
```

Para añadir una pestaña: crear `features/<nombre>/`, registrar su ruta lazy en `app.routes.ts` y añadirla a `tabs` en el shell.

## Arranque con Docker

```bash
docker compose up -d --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend | http://localhost:8080 |
| Health | http://localhost:8080/actuator/health |
| MongoDB | localhost:27017 |

## Desarrollo local

```bash
# Solo la base de datos
docker compose -f docker-compose.dev.yml up -d

# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && npm install && ng serve
```

## CI

El workflow [ci.yml](.github/workflows/ci.yml) se ejecuta en cada push a `main` y en cada pull request:
tests y build del backend, tests y build del frontend, y construcción de las imágenes Docker.
