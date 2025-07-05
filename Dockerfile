FROM node:16.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install --save --legacy-peer-deps

RUN npm install postcss-discard-comments --save-dev --legacy-peer-deps
RUN npm install postcss@latest --save-dev --legacy-peer-deps

RUN npm run build

EXPOSE 8800

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8800

CMD [ "npm", "run", "prod" ]