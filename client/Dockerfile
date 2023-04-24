# syntax=docker/dockerfile:1
FROM nginx:1.23-alpine

WORKDIR /etc/nginx
COPY ./nginx.conf .

WORKDIR /data/www
COPY ./public/* .