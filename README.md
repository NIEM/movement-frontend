NIEM - Movement: Frontend
=====================

The other code repositories include the [Movement - Backend](https://github.com/NIEM/movement-backend) and the [Movement - Solr](https://github.com/NIEM/movement-solr). 

Prior to coming to this repo, did you happen to catch our [Movement overview](https://github.com/NIEM/Movement)?

## Got feedback? 
In the spirit of open-source tooling, we have provided a [Scrum board](https://github.com/NIEM/Movement/projects/1) that allows users to keep track of Movement’s issues and enhancements. Anyone can [submit a new issue](https://github.com/NIEM/Movement/issues) for the tool for something they would like to see added or a bug. Once reviewed by the engineering team, issues will be added to the Scrum board's backlog. Developers and tool contributors can then address issues from the backlog and track their status using the Scrum board—providing an Agile approach to development and complete transparency to users.

# Running the App with Docker

The frontend can be run via Docker. To run the web app locally with Docker, first make sure you have installed and setup the NIEM Movement Docker config:
```
docker network create niem-network
```

Note: Also, build and run the Solr and Backend Docker containers. Then build and run the frontend container, from the repo's root directory:
```
docker build -t movement-frontend .
docker run -dti -p 7000:7000 --name movement-frontend --net niem-network movement-frontend
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
