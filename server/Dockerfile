# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

COPY ./dist ./dist
COPY ./package.json .
COPY ./package-lock.json .
COPY .env .

RUN npm ci

CMD ["npm", "start"]