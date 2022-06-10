FROM node:12-alpine as base

WORKDIR /app/client
COPY package.json tsconfig.json tsconfig.node.json ./

RUN yarn
