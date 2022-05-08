FROM node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY build /app

RUN npm install -g serve

EXPOSE 3001

CMD [ "serve", "-s", "/app", "-l", "3001" ]
