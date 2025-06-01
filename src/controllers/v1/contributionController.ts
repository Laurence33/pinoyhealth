import { NextFunction, Request, Response } from 'express';
import { IContributionInteractor } from '../../interfaces/IContributionInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';

class ContributionController {
  constructor(private interactor: IContributionInteractor) {}

  onUpdateContribution = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { body } = req;
    const result = await this.interactor.updateContribution(body);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };
}

export { ContributionController };
