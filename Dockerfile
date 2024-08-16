FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . . 

ENTRYPOINT ["npm", "run", "prod"]