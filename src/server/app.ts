import * as path from 'path';
import * as feathers from '@feathersjs/feathers';
import * as express from '@feathersjs/express';

const staticDir = path.resolve(__dirname, 'public');
const otherStaticDir = path.resolve(__dirname, '../static');
const app = express(feathers());

app.use(express.static(otherStaticDir));

app.use('/public', express.static(staticDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

export { app };
