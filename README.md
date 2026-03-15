# nest-pool-test

Minimal repo to reproduce the `Too many connections` error locally.

## Setup

```bash
npm install
docker compose up -d
npm run start:dev
```

## Triggering the error

```bash
curl http://localhost:3000/test/connection-pool
```

The endpoint fires 20 concurrent `SELECT SLEEP(5)` queries. The database has `max_connections = 15` and the app has `connectionLimit = 30` — the total exceeds the DB limit and you get a `Too many connections` error.

## Variant with an app-side connection limit

In `src/app.module.ts` set `connectionLimit` to a value lower than 15, e.g.:

```ts
extra: {
  connectionLimit: 5,
},
```

Restart the app and call the same endpoint. The error disappears — the app can't open more than 10 connections, so some queries wait in the pool queue until a slot is released. The request takes longer, but no error is thrown.
