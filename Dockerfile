FROM node:18-slim

RUN ["apt-get", "update"]

WORKDIR /fastFood

COPY . .

RUN ["npm", "install"]
RUN ["npm", "run", "build"]

