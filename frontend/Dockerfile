FROM node:17-alpine as builder
WORKDIR /react-app
COPY package.json .
RUN npm install -legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npm", "start"]