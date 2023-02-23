FROM node:19

WORKDIR /app

COPY . /app
RUN npm install

EXPOSE 80
ENV NODE_ENV=production

CMD ["npm", "start"]