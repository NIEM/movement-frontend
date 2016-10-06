dhsniem
=================

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


Solr Setup and Integration

0) Requirements: JRE 1.8 or higher

1) Solr is available from the Solr website at http://lucene.apache.org/solr/. For Linux/Unix/OSX systems, download the .tgz file. For Microsoft Windows systems, download the .zip file. When getting started, all you need to do is extract the Solr distribution archive to a directory of your choosing, e.g. C:/

2) On Command Line/Terminal, go to your solr/bin directory, and run the command `solr start`

3) Check to make sure solr is running with `solr status`

4) Create a core to be able to index and search. From solr/bin run `solr create -c niem-test-xsd`

5) Drag and drop the files from this repo, dhsniem/solr_config, and drop into /solr-6.2.0/server/solr/niem-test-xsd/conf. Replace the existing files

6) Hit the url (either via a browser, curl, or another tool): http://localhost:8983/solr/niem-test-xsd/dataimport?command=full-import. Note: Hit it twice to get the data response back.

7) Start the dhsniem app, `npm start` if you have not already and verify results are returned.

8) To stop solr, from solr/bin run `solr stop -all`