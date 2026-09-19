# Connectable Pathways MVP

A full-stack MVP for creating, validating, and executing connectable pathways using:

- NestJS backend
- Flutter frontend
- PostgreSQL + Prisma
- Redis + BullMQ
- Docker Compose for local services

## What this MVP includes

- Node-based workflow editor in Flutter
- Pathway creation and editing via API
- Graph validation and cycle detection
- Pathway execution queue
- Execution status tracking
- Dockerized local PostgreSQL and Redis
- Prisma schema ready for database persistence

## Stack

- Frontend: Flutter
- Backend: NestJS (TypeScript)
- Database: PostgreSQL + Prisma
- Queue: Redis + BullMQ
- Local infra: Docker Compose

## Requirements

- Node.js 20+
- npm
- Flutter SDK
- Docker Desktop or Docker Engine

## Quick start

### 1) Start dependencies

```bash
docker compose up -d postgres redis
```

### 2) Backend

```bash
cd apps/api
cp ../../.env.example .env
npm install
npm run prisma:generate
npm run start:dev
```

### 3) Flutter app

```bash
cd apps/mobile
flutter pub get
flutter run
```

## API

### Create pathway

```bash
curl -X POST http://localhost:3000/pathways \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "ws_default",
    "name": "Customer onboarding",
    "description": "Lead qualification and onboarding flow",
    "nodes": [],
    "edges": []
  }'
```

### Fetch all pathways

```bash
curl http://localhost:3000/pathways
```

### Validate pathway

```bash
curl -X POST http://localhost:3000/pathways/:id/validate
```

### Run pathway

```bash
curl -X POST http://localhost:3000/pathways/:id/run \
  -H "Content-Type: application/json" \
  -d '{
    "leadScore": 83,
    "country": "US"
  }'
```

## Project structure

```text
connectable-pathways/
├── apps/
│   ├── api/
│   └── mobile/
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

## Notes

This is a working MVP intended for local development and extension. The current backend operates with an in-memory graph store to keep the application runnable without external setup while the Prisma schema remains available for future persistence work.
