FROM node:18.16.0
WORKDIR /usr
COPY . . 
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
