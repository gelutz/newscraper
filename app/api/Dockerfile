FROM node:12-alpine as base

WORKDIR /usr/app/api

FROM base as prod

COPY package.json tsconfig.json ./

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=production

FROM prod as development

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --only=development

EXPOSE 3333
EXPOSE 9229