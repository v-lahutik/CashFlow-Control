FROM node:18

WORKDIR /app

COPY . /app

RUN npm install
RUN npx update-browserslist-db@latest

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
