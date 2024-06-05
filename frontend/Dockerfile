FROM node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN npm run build

EXPOSE 8080

CMD ["npm","run","preview"]
