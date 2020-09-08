FROM node:lts

EXPOSE 3000
WORKDIR /app

CMD yarn install && yarn run start --host 0.0.0.0
