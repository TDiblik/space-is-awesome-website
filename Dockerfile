## Build ##
FROM node:23.9-alpine AS builder
RUN apk update --no-cache && apk upgrade --no-cache && rm -rf /var/cache/apk/*

WORKDIR /build
COPY package.json .
RUN yarn install --frozen-lockfile --production

COPY ./src ./src
RUN yarn css:compile:cli

## Production image ##
FROM nginx:alpine
RUN apk update --no-cache && apk upgrade --no-cache && rm -rf /var/cache/apk/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-config /etc/nginx/conf.d/space-is-awesome.conf
COPY --from=builder /build/src/index.html /app/space-is-awesome/index.html
COPY --from=builder /build/src/subpages /app/space-is-awesome/subpages
COPY --from=builder /build/src/public /app/space-is-awesome/public

EXPOSE 21296

CMD ["nginx", "-g", "daemon off;"]