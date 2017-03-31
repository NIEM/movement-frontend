NIEM - Movement: Frontend
=====================

The other repositories include the [Movement - Backend](https://github.com/NIEMconnects/movement-backend) and the [Movement - Solr](https://github.com/NIEMconnects/movement-solr).

# Running the App with Docker

The frontend can be run via Docker. To run the web app locally with Docker, first make sure you have installed and setup the NIEM Movement Docker config:
```
docker network create niem-network
docker run -dti -p 27017:27017 --name wist-mongo --net niem-network
```

Note: Also, build and run the Solr and Backend Docker containers. Then build and run the frontend container, from the repo's root directory:
```
docker build -t wist-frontend .
docker run -dti -p 7000:7000 --name wist-frontend --net niem-network wist-frontend
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
