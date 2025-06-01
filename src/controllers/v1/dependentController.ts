import { NextFunction, Request, Response } from 'express';
import { IDependentInteractor } from '../../interfaces/IDependentInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';

class DependentController {
  constructor(private interactor: IDependentInteractor) {}

  onGetDependent = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    const dependent = await this.interactor.getDependent(id);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: dependent,
    });
  };

  onGetDependents = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { pageSize, pageNumber } = req.query;
    const result = await this.interactor.getDependents(
      Number(pageSize),
      Number(pageNumber),
    );
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onUpdateDependent = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const {
      params: { id },
      body,
    } = req;
    const result = await this.interactor.updateDependent(id, body);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };
}

export { DependentController };
