# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_DELIVERY_TOKEN
ARG SITE_URL=https://example.com

ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_DELIVERY_TOKEN=$CONTENTFUL_DELIVERY_TOKEN
ENV SITE_URL=$SITE_URL

RUN npm run build

FROM nginx:1.27-alpine AS runner

ENV PORT=3660

COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3660
