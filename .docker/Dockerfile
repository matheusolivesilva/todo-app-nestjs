FROM node:lts-alpine3.14

RUN npm install -g @nestjs/cli

RUN mkdir -p /usr/src/cache && mkdir -p /usr/src/app
RUN chown node:node /usr/src/cache && chown node:node /usr/src/app

WORKDIR /usr/src/cache

COPY ./package*.json ./
RUN chown node:node package*.json

USER node

RUN npm install

WORKDIR /usr/src/app

COPY ./ ./

