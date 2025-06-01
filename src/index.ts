import express, { Request } from 'express';
import morgan from 'morgan';
import config from './config/config';
import v1Router from './routes/v1/index';
import apiKeyMw from './middlewares/apiKeyMw';
import { requestIdMw } from './middlewares/requestIdMw';
import { Logger } from './utils/logger';
import { globalErrorHandlerMw } from './middlewares/globalErrorHandlerMw';
import { addLoggerMw } from './middlewares/addLoggerMw';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '1mb' }));
app.use(apiKeyMw);
app.use(requestIdMw);
app.use(addLoggerMw);

morgan.token('id', (req: Request) => {
  return req.requestId.get();
});
app.use(
  morgan(
    'API Stats [:id]: :method :url :status :res[content-length] - :response-time ms',
  ),
);

app.use('/api/v1', v1Router);

// ? Not found handler
// app.use('*', (_req: Request, res: Response, _nxt: NextFunction) => {
//   res.status(404).json({ statusCode: 404, message: 'Not found' });
// });

app.use(globalErrorHandlerMw);

app.listen(config.port, '0.0.0.0', () =>
  Logger.info(`Server listening on port ${config.port}`),
);
