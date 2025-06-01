import { NextFunction, Request, Response } from 'express';
import { IDependentInteractor } from '../../interfaces/IDependentInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';

class DependentController {
  constructor(private interactor: IDependentInteractor) {}

  // onCreateDependent = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { body } = req;
  //   const dependent = await this.interactor.createDependent(body);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.CREATED,
  //     data: dependent,
  //   });
  // };

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

  // onReplaceDependent = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { id } = req.params;
  //   const fields = req.body;
  //   const updatedDependent = await this.interactor.updateDependent(id, fields);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: updatedDependent,
  //   });
  // };
  // onUpdateDependent = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { id } = req.params;
  //   const fields = req.body;
  //   const updatedDependent = await this.interactor.updateDependent(id, fields);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: updatedDependent,
  //   });
  // };
  // onDeleteDependent = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { id } = req.params;
  //   if (!id) {
  //     throw new Error('Id is required');
  //   }

  //   // TODO: check for contribution
  //   // TODO: check for dependents

  //   const deletedDependent = await this.interactor.deleteDependent(id);
  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: deletedDependent,
  //   });
  // };
}

export { DependentController };
