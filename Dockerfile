# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.1.0
FROM node:${NODE_VERSION}-slim AS base

ENV TZ Asia/Tokyo

RUN apt-get update -y && apt-get install -y openssl curl

## development
FROM base AS development

## test
FROM base As test

COPY . .

## build
FROM base As build

WORKDIR /app

RUN \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm,sharing=locked \
  npm ci --include=dev

COPY . .

## RUN build
RUN npm prune --omit=dev

## production
FROM base As production

ENV NODE_ENV production


COPY --from=build /app/node_modules ./node_module
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist

USER node

EXPOSE 3000

# CMD ["npm", "run", "start"]
