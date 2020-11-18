FROM node:lts-stretch
LABEL maintainer="Matheus Henrique"

WORKDIR /smarkio-case
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333
ENTRYPOINT [ "npm", "run", "start" ]
