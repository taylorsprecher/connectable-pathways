FROM node:20-slim

# Prisma engines need OpenSSL present at generate and runtime.
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

# v1 has no migrations folder yet, so the schema is pushed on boot
# (a no-op once the database matches), then the API starts.
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/main"]
