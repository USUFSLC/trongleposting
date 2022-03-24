FROM node:14.17.1-buster-slim

EXPOSE 8000
WORKDIR /app

ENV NODE_ENV production

COPY . /app
COPY .sequelizerc /app

RUN npm install -g sequelize-cli
RUN npm install -g nodemon
RUN npm ci

CMD ["npm", "run", "start"]
