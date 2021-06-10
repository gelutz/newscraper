FROM node:12.18.2-alpine

WORKDIR /app
COPY package.json .

# Yarn comes preinstalled with node
ADD . /app
RUN yarn install
RUN yarn tsc

# Start
CMD [ "yarn", "start"]
EXPOSE 7001