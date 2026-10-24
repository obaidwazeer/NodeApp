#Automated CI/CD Pipeline for a Dockerized Application on AWS EC2

## Docker Setup

To containerize this application, I have use the following Dockerfile configuration:

```Dockerfile
FROM node:14
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ['node', 'index.js']
```

