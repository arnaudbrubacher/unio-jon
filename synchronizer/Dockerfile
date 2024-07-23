# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /synchronizer

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .


EXPOSE 3101

CMD ["yarn", "start"]