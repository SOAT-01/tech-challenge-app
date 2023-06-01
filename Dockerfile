FROM node:18.16.0
WORKDIR /usr/src
COPY . .
EXPOSE 3000
RUN yarn install
RUN yarn build
CMD ["yarn", "dev"]