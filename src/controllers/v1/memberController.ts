import { NextFunction, Request, Response } from 'express';
import { format } from '@fast-csv/format';
import { formatDate } from 'date-fns';
import { IMemberInteractor } from '../../interfaces/IMemberInteractor';
import { HttpCode } from '../../interfaces/HttpCode';
import { sendHttpResponse } from '../../utils/httpResponse';
import { ValidationError } from '../../utils/ValidationError';

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
    const member = await this.interactor.getMember(id);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: member,
    });
  };

  onGetMemberV2 = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const {
      params: { id },
    } = req;
    const member = await this.interactor.getMemberV2(id);

    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: member,
    });
  };

  onGetMembers = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { pageSize, pageNumber } = req.query;
    const result = await this.interactor.getMembers(
      Number(pageSize),
      Number(pageNumber),
    );
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onGetDependents = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const result = await this.interactor.getDependents(id);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onCreateDependent = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.interactor.createDependent(id, body);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onGetContributions = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const result = await this.interactor.getContributions(id);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onDownloadContributions = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const member = await this.interactor.getMember(id);
    if (!member) {
      throw new ValidationError(`Member with id ${id} not found`);
    }
    const contributions = await this.interactor.getContributions(id);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="contributions-${member.member_number}.csv"`,
    );

    const stream = format({ headers: true });
    stream.pipe(res);

    contributions.forEach((contribution) => {
      stream.write({
        ...contribution,
        month: formatDate(new Date(contribution.month), 'yyyy-MM-dd'),
      });
    });
    stream.end();
  };

  onCreateContribution = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.interactor.createContribution(id, body);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: result,
    });
  };

  onReplaceMember = async (
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
  onUpdateEmployerNumber = async (
    req: Request,
    res: Response,
    _nxt: NextFunction,
  ): Promise<any> => {
    const { id } = req.params;
    const { employer_number } = req.body;
    const updatedMember = await this.interactor.updateEmployerNumber(
      id,
      employer_number,
    );
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
      throw new ValidationError('Id is required');
    }

    const deletedMember = await this.interactor.deleteMember(id);
    return sendHttpResponse({
      res,
      statusCode: HttpCode.SUCCESS,
      data: deletedMember,
    });
  };
}

export { MemberController };
