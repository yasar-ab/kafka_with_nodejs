FROM node:20-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 6000

CMD ["npm",'nodemon', "start"]