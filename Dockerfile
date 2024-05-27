FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN  npm install
COPY  . .
ENV PORT 8080
ENV JWT_SECRET token-jwt-ini-sangat-rahasia-sekali-banget
ENV JWT_EXPIRES 1d
EXPOSE ${PORT}
CMD [ "npm","start" ]