FROM node:20-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "run", "dev"]