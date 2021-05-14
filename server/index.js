const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname + '/productDB.json'));
const middlewares = jsonServer.defaults({
  static: path.resolve(__dirname + '/../build/'),
});

const port = process.env.PORT || 4000;

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running!', port);
});
