import { NextFunction, Request, Response } from 'express';
import { IMemberInteractor } from '../../interfaces/IMemberInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { ApiError } from '../../utils/ApiError';
import { sendHttpResponse } from '../../utils/httpResponse';

class MemberController {
  constructor(private interactor: IMemberInteractor) {}

  onCreateMember = async (
    req: Request,
    res: Response,
    nxt: NextFunction,
  ): Promise<any> => {
    try {
      const { body } = req;
      // TODO: validate here
      const member = await this.interactor.createMember(body);

      return sendHttpResponse({
        res,
        statusCode: HttpCode.CREATED,
        data: member,
      });
    } catch (error) {
      nxt(error);
    }
  };

  onGetMember = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    try {
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
    } catch (error: any) {
      throw new ApiError(
        HttpCode.INTERNAL_SERVER_ERROR,
        error.message,
        error.stack,
      );
    }
  };

  onGetMembers(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
  onReplaceMember(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
  onUpdateMember(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
  onDeleteMember(req: Request, res: Response, nxt: NextFunction) {
    throw Error('Not implemented');
  }
}

export { MemberController };
