FROM node:18-alpine

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


EXPOSE 4000



CMD [ "npm", "start" ]