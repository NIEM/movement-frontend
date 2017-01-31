NIEM - WIST: Frontend
=====================


The other repositories include the [WIST - Backend](https://github.com/NIEMconnects/wist-backend) and the [WIST - Solr](https://github.com/NIEMconnects/wist-solr).

# Frontend Setup

Frontend is run via Docker. To run the web app locally with Docker:

```
docker build -t wist-frontend .
docker run -d -p 80:80 -t wist-frontend
```

# Jenkins Job Setup 

```
#!bin/bash
chmod u+x deploy.sh
./deploy.sh
```

# Web App Features

Prerequisites

Install [NodeJs](https://nodejs.org/)

Install Bower ```npm install -g bower```

To start the development server

```
npm start
```

To run unit tests

```
npm test
```

To build app for deployment

```
npm run build
```

To build app for deployment with tests and docs

```
npm run build
```

If you are using the [JSDoc](http://usejsdoc.org/) style of comments (which you should!!!) you can generate your documentation with the following command. Documentation can be found under `docs/client/` (Hooray  for automated documentation!)

```
npm run docs
```
