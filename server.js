const jsonServer = require('json-server');
const server = jsonServer.create();
const cors = require('cors');

const path = require('path');

const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults({
  static: './build',
});

const port = process.env.PORT || 4000;

server.use(middlewares);

const customRouter = jsonServer.rewriter({
  '/api/*': '/$1',
});

server.db = router.db;

server.use(cors());
server.use(customRouter);
server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running');
});
