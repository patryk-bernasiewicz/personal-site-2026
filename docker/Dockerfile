# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG PUBLIC_SITE_URL=http://localhost:4321
ARG CONTENTFUL_ENABLED=false
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_DELIVERY_TOKEN
ARG CONTENTFUL_PREVIEW_TOKEN
ARG MUSIC_PLAYLIST_URL=https://s3.patrykb.pl/patrykbpl/audio/playlist.json

ENV NODE_ENV=production
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV CONTENTFUL_ENABLED=$CONTENTFUL_ENABLED
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_DELIVERY_TOKEN=$CONTENTFUL_DELIVERY_TOKEN
ENV CONTENTFUL_PREVIEW_TOKEN=$CONTENTFUL_PREVIEW_TOKEN
ENV MUSIC_PLAYLIST_URL=$MUSIC_PLAYLIST_URL

RUN npm run content:check && npx astro telemetry disable && npm run build

FROM nginx:1.27-alpine AS runner

ENV PORT=3660

COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3660
