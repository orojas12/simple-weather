# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["npm", "start"]