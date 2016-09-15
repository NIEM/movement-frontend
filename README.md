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

4) Check to make sure solr is running with `solr status`

5) Create a core to be able to index and search. From solr/bin run `solr create -c niem-test-csv`

6) To index files, we will use Solr's SimplePostTool, a standalone Java program bundled into an executable JAR. Run the command below and replace the relatvie paths to solr and this app (dhsniem) with the appropriate paths.

`java -Durl=http://localhost:8983/solr/niem-test-csv/update/csv -Dtype=text/csv -jar [path/to/solr]/example/exampledocs/post.jar [path/to/dhsniem]/src/csv/*.csv`

7) Run dhsniem app with `npm start`. Confirm that Results are found with the count noted on the page. Search `alien` to confirm that the query is working.

8) More to come...

9) To stop solr, from solr/bin run `solr stop -all`