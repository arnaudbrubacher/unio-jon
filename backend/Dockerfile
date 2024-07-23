# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /backend

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .


EXPOSE 3102

CMD ["yarn", "start"]