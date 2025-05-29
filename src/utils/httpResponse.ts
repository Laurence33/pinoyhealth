import { HttpCode } from './../interfaces/HttpCode';
import { Response } from 'express';

type HttpResponseParam = {
  res: Response;
  statusCode: HttpCode;
  data: any;
};

const sendHttpResponse = ({ res, statusCode, data }: HttpResponseParam) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    data,
  });
};

export { sendHttpResponse };
