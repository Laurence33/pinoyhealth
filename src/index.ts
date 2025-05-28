import express, { Request, Response } from 'express';
import config from './config/config';
import v1Router from './routes/v1/index';
import apiKeyMw from './middlewares/apiKey';

const app = express();
app.use(express.json());
app.use(apiKeyMw);

app.use('/api/v1', v1Router);

app.get('/', async (req: Request, res: Response): Promise<any> => {
  return res.json({
    body: req.body,
    message: 'hello world!',
  });
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`),
);
