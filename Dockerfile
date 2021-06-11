# build stage
FROM node:lts-alpine as build-stage

ARG VUE_APP_APIKEY
ARG VUE_APP_AUTH_DOMAIN
ARG VUE_APP_PROJECT_ID
ARG VUE_APP_STORAGE_BUCKET
ARG VUE_APP_MESSAGING_SENDER_ID
ARG VUE_APP_APP_ID
ARG VUE_APP_PROJECT_ID
ARG VUE_APP_GATEWAY_API_URL

ENV VUE_APP_APIKEY=$VUE_APP_APIKEY
ENV VUE_APP_AUTH_DOMAIN=$VUE_APP_AUTH_DOMAIN
ENV VUE_APP_PROJECT_ID=$VUE_APP_PROJECT_ID
ENV VUE_APP_STORAGE_BUCKET=$VUE_APP_STORAGE_BUCKET
ENV VUE_APP_MESSAGING_SENDER_ID=$VUE_APP_MESSAGING_SENDER_ID
ENV VUE_APP_APP_ID=$VUE_APP_APP_ID
ENV VUE_APP_PROJECT_ID=$VUE_APP_PROJECT_ID
ENV VUE_APP_BASEURL=$VUE_APP_BASEURL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["sh", "/entrypoint.sh"]
