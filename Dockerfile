FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install -g @angular/cli && \
    npm install

COPY . .

EXPOSE 4200
