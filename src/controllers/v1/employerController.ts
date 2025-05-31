import { NextFunction, Request, Response } from 'express';
import { IEmployerInteractor } from '../../interfaces/IEmployerInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';

class EmployerController {
  constructor(private interactor: IEmployerInteractor) {}

  // onCreateEmployer = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { body } = req;
  //   const employer = await this.interactor.createEmployer(body);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.CREATED,
  //     data: employer,
  //   });
  // };

  onGetEmployer = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    const employer = await this.interactor.getEmployer(id);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: employer,
    });
  };

  onGetEmployers = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { pageSize, pageNumber } = req.query;
    const result = await this.interactor.getEmployers(
      Number(pageSize),
      Number(pageNumber),
    );
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  // onReplaceEmployer = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { id } = req.params;
  //   const fields = req.body;
  //   const updatedEmployer = await this.interactor.updateEmployer(id, fields);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: updatedEmployer,
  //   });
  // };
  // onUpdateEmployer = async (
  //   req: Request,
  //   res: Response,
  //   _nxt: NextFunction,
  // ): Promise<any> => {
  //   const { id } = req.params;
  //   const fields = req.body;
  //   const updatedEmployer = await this.interactor.updateEmployer(id, fields);

  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: updatedEmployer,
  //   });
  // };
  // onDeleteEmployer = async (
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

  //   const deletedEmployer = await this.interactor.deleteEmployer(id);
  //   return sendHttpResponse({
  //     res,
  //     statusCode: HttpCode.SUCCESS,
  //     data: deletedEmployer,
  //   });
  // };
}

export { EmployerController };
