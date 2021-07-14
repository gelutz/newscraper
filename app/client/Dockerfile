FROM node:12-alpine as base

WORKDIR /usr/app/client

FROM base as prod

# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json tsconfig.json ./
# COPY package-lock.json ./

# necessary
# RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install --quiet --unsafe-perm --no-progress --only=production

FROM prod as development

RUN npm install --quiet --unsafe-perm --no-progress --only=development

EXPOSE 3000
