FROM node:12-alpine as base

WORKDIR /usr/app/server

FROM base as prod

COPY package.json tsconfig.json ./
# COPY package-lock.json ./

RUN yarn --prod

FROM prod as development

RUN yarn

EXPOSE 3333
