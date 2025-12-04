## Build ##
FROM oven/bun:alpine AS builder

WORKDIR /build
ENV NODE_ENV=production

COPY ./package.json ./bun.lock ./
RUN bun install --frozen-lockfile

COPY ./src ./src
RUN bun run css:compile:cli

## Production image ##
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-config /etc/nginx/conf.d/space-is-awesome.conf
COPY --from=builder /build/src/index.html /app/space-is-awesome/index.html
COPY --from=builder /build/src/subpages /app/space-is-awesome/subpages
COPY --from=builder /build/src/public /app/space-is-awesome/public

EXPOSE 21296

CMD ["nginx", "-g", "daemon off;"]