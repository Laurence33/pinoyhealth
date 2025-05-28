import express, { Request } from 'express';
import morgan from 'morgan';
import config from './config/config';
import v1Router from './routes/v1/index';
import apiKeyMw from './middlewares/apiKeyMw';
import { requestIdMw } from './middlewares/requestIdMw';

const app = express();
app.use(express.json());
app.use(apiKeyMw);
app.use(requestIdMw);

morgan.token('id', (req: Request) => {
  return req.requestId.get();
});

app.use(
  morgan(
    'API Stats [:id]: :method :url :status :res[content-length] - :response-time ms',
  ),
);

app.use('/api/v1', v1Router);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`),
);
