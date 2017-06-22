NIEM - Movement: Frontend
=====================

The other code repositories include the [Movement - Backend](https://github.com/NIEM/movement-backend) and the [Movement - Solr](https://github.com/NIEM/movement-solr). 

Prior to coming to this repo, did you happen to catch our [Movement overview](https://github.com/NIEM/Movement)?

## Got feedback? 
For general tool feedback or issues please [open an issue in the Movement repo](https://github.com/NIEM/Movement/issues)  or [contact us on NIEM.gov](https://niem.gov/contact-us). 

For topics specific to contributions to Movement's frontend, please [submit an issue](https://github.com/NIEM/movement-frontend/issues).

# Running the App with Docker

The frontend can be run via Docker. To run the web app locally with Docker, first make sure you have installed and setup the NIEM Movement Docker config:
```
docker network create niem-network
```

Note: Also, build and run the Solr and Backend Docker containers. Then build and run the frontend container, from the repo's root directory:
```
docker build -t movement-frontend .
docker run -dti -p 80:80 --name movement-frontend --net niem-network movement-frontend
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

If you are using the [JSDoc](http://usejsdoc.org/) style of comments (which you should!!!) you can generate your documentation with the following command. Documentation can be found under `docs/` (Hooray  for automated documentation!)

```
npm run docs
```
