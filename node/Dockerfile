FROM node:20.14.0

WORKDIR /usr/src/app

COPY package.json package-lock.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
