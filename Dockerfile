FROM oven/bun:latest

WORKDIR /app

COPY ./package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bunx prisma generate

CMD ["bun", "run", "dev:docker"]
