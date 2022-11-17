FROM node:16

EXPOSE 8000
WORKDIR /app

ENV NODE_ENV production

COPY . /app
COPY .sequelizerc /app

RUN npm ci

CMD ["node", "index.js"]
