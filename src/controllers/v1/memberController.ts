import { NextFunction, Request, Response } from 'express';
import { IMemberInteractor } from '../../interfaces/IMemberInteractor';
import { HttpCode } from '../../interfaces/HttpCode';

class MemberController {
  constructor(private interactor: IMemberInteractor) {}

  onCreateMember = async (
    req: Request,
    res: Response,
    nxt: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { body } = req;
      // TODO: validate here
      const member = await this.interactor.createMember(body);
      return res.status(HttpCode.CREATED).json(member);
    } catch (error) {
      nxt(error);
    }
  };

  onGetMember = async (
    req: Request,
    res: Response,
    nxt: NextFunction,
  ): Promise<Response | void> => {
    try {
      const {
        params: { id },
      } = req;
      // TODO: validate here
      const member = await this.interactor.getMember(id);
      return res.status(HttpCode.SUCCESS).json(member);
    } catch (error) {
      nxt(error);
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
