import { NextFunction, Request, Response } from 'express';
import { IMemberInteractor } from '../../interfaces/IMemberInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';

class MemberController {
  constructor(private interactor: IMemberInteractor) {}

  onCreateMember = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { body } = req;
    const member = await this.interactor.createMember(body);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.CREATED,
      data: member,
    });
  };

  onGetMember = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    // TODO: validate here
    const member = await this.interactor.getMember(id);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: member,
    });
  };

  onGetMembers(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
  onReplaceMember(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
  onUpdateMember = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const fields = req.body;
    const updatedMember = await this.interactor.updateMember(id, fields);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: updatedMember,
    });
  };
  onDeleteMember = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    if (!id) {
      throw new Error('Id is required');
    }

    // TODO: check for contribution
    // TODO: check for dependents

    const deletedMember = await this.interactor.deleteMember(id);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: deletedMember,
    });
  };
}

export { MemberController };
