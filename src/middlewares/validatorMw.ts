import { NextFunction, Response, Request } from 'express';
import { ZodObject, treeifyError } from 'zod/v4';
import { HttpCode } from '../interfaces/HttpCode';

const validatorMw = (zodObject: ZodObject) => {
  return async (req: Request, res: Response, nxt: NextFunction) => {
    const { body, logger } = req;
    const result = await zodObject.safeParseAsync(body);

    if (!result.success) {
      const errors = treeifyError(result.error).properties;
      logger.info('Validation Error:', errors);

      res.status(HttpCode.BAD_REQUEST).json({
        statusCode: HttpCode.BAD_REQUEST,
        errors,
      });
      return;
    }

    req.body = result.data;
    nxt();
  };
};

export { validatorMw };
