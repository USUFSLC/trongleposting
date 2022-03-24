FROM node:14.17.1-buster-slim

EXPOSE 8000

WORKDIR /app

ENV NODE_ENV production

COPY . /app
COPY .sequelizerc /app

RUN npm install
RUN npm install -g sequelize-cli
RUN npm install -g nodemon

CMD ["npm", "run", "start"]
