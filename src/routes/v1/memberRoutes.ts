import { Router } from 'express';
import { MemberController } from '../../controllers/v1/memberController';
import { MemberInteractor } from '../../interactors/MemberInteractor';
import { validatorMw } from '../../middlewares/validatorMw';
import { createMemberValidator } from '../../validators/createMemberValidator';
import { BaseRepository } from '../../repositories/baseRepository';
import { TableName } from '../../interfaces/TableName';
import { Dependent } from 'entities/Dependent';
import { Contribution } from 'entities/Contribution';
import { createContributionValidator } from '../../validators/createContributionValidator';
import { updateMemberEmployerNumberValidator } from '../../validators/updateMemberEmployerNumber';
import { createUpdateDependentValidator } from '../../validators/createUpdateDependentValidator';
import { updateMemberValidator } from '../../validators/updateMemberValidator';
import { MemberRepository } from '../../repositories/memberRepository';

const dependentRepository = new BaseRepository<Dependent>({
  tableName: TableName.DEPENDENT,
  primaryKey: 'id',
});

const contributionRepository = new BaseRepository<Contribution>({
  tableName: TableName.CONTRIBUTION,
  primaryKey: 'member_number',
});

const memberRepository = new MemberRepository();
const memberInteractor = new MemberInteractor(
  memberRepository,
  dependentRepository,
  contributionRepository,
);
const memberController = new MemberController(memberInteractor);

const router = Router();
router.get('/', memberController.onGetMembers);
router.post(
  '/',
  validatorMw(createMemberValidator),
  memberController.onCreateMember,
);
router.get('/:id', memberController.onGetMember);
router.get('/:id/dependents', memberController.onGetDependents);
router.post(
  '/:id/dependents',
  validatorMw(createUpdateDependentValidator),
  memberController.onCreateDependent,
);
router.get('/:id/contributions', memberController.onGetContributions);
router.get('/:id/contributions/csv', memberController.onDownloadContributions);
router.post(
  '/:id/contributions',
  validatorMw(createContributionValidator),
  memberController.onCreateContribution,
);
router.put('/:id', memberController.onReplaceMember);
router.patch(
  '/:id',
  validatorMw(updateMemberValidator),
  memberController.onUpdateMember,
);
router.patch(
  '/:id/employer_number',
  validatorMw(updateMemberEmployerNumberValidator),
  memberController.onUpdateEmployerNumber,
);
router.delete('/:id', memberController.onDeleteMember);

export default router;
