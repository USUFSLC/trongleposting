FROM node:14.17.1-buster-slim

EXPOSE 3000

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "run-script", "start"]
