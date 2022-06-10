FROM node:12-alpine as base

WORKDIR /app/server

COPY package.json tsconfig.json package-lock.json ./

RUN yarn
