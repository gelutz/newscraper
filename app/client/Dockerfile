FROM node:12-alpine as base

WORKDIR /usr/app/client

RUN yarn global add react-scripts@4.0.3
COPY package.json tsconfig.json ./

RUN yarn

EXPOSE 3000
