# specify the node base image with your desired version node:<version>
FROM node:10

WORKDIR /usr/src/backup

COPY package*.json ./
COPY backup.js ./
COPY yarn.lock ./

RUN yarn install

CMD ["node","backup.js"]
