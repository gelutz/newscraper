FROM node:12-alpine as base

WORKDIR /usr/app/webscraper

FROM base as prod

COPY package.json tsconfig.json ./
# COPY package-lock.json ./

RUN npm install --quiet --unsafe-perm --no-progress --only=production

FROM prod as development

RUN npm install --quiet --unsafe-perm --no-progress --only=development

EXPOSE 4000
