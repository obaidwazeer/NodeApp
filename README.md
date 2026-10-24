Automated CI/CD Pipeline for a Dockerized Application on AWS EC2

1 -> Dockerfile for the sample node js App

-------------------------------------------

FROM node:14
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ['node', 'index.js']

---------------------------------------------
