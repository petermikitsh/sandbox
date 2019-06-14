import * as http from 'http';
import { app } from './app';
import * as stoppable from 'stoppable';

let server;

function start() {
  server = stoppable(http.createServer(app), 0);
  server.listen(3000, () => {
    app.setup(server);
    console.log('Listening at http://0.0.0.0:3000/');
  });
}

start();

if (module.hot) {
  module.hot.accept('./app', () => {
    server.stop(() => {
      start();
    });
  });
}
