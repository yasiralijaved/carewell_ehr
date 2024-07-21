FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Install MySQL client utilities
RUN apt-get update && apt-get install -y default-mysql-client

COPY . .

EXPOSE 5000

CMD ["nodemon", "--watch", ".", "server.js"]
