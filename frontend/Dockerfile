FROM node:14.17.1-buster-slim

EXPOSE 3000
RUNK mkdir -p /app/public /app/src
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

CMD ["npm", "run", "dev"]