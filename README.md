Igor Lanches - Fullstack Next.js app (minimal starter)

This package contains a ready-to-deploy Next.js app with API routes (backed by PostgreSQL). Use on Render as a Web Service.

Quick steps to deploy on Render:
1. Create a Postgres database (Render Managed Postgres or other).
2. Create a GitHub repo and push these files.
3. In Render, create a New Web Service -> Connect GitHub repo -> build command `npm install && npm run build` -> start command `npm start`.
4. Set environment variables on Render: DATABASE_URL (Postgres connection string), JWT_SECRET (random string).
5. Run the SQL in `db/schema.sql` to create tables (Render dashboard -> Console -> psql) or use a psql client.

Files included:
- pages/ (UI pages)
- pages/api/* (API endpoints: mesas, clientes, itens, pedidos)
- db/schema.sql (SQL to create DB + seed)
- .env.example
