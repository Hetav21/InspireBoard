# InspireBoard: Pintrest Clone: Backend

## How to start backend: 
1. Install Dependencies: npm i
2. Create a .env file: touch .env
3. Add DATABASE_URL to the .env file which points to the actual DB url
4. Create wrangler.toml: touch wrangler.toml
5. Add the following:
    [vars]
    JWT_SECRET="SECRET-PASS"
    DATABASE_URL="Prisma Pool Url generated using Prisma Accelerate"
6. If you want to start application in local mode: npm run dev
7. If you want to start serverless application: npx wrangler login _OPTIONAL_
                                                npm run deploy

## Learn about routes:
Go to backend/src/routes/README.md