import { Router } from 'express';
import { MemberController } from '../../controllers/v1/memberController';
import { MemberInteractor } from '../../interactors/MemberInteractor';
import { validatorMw } from '../../middlewares/validatorMw';
import { createMemberValidator } from '../../validators/createMemberValidator';
import { BaseRepository } from '../../repositories/baseRepository';
import { Member } from '../../entities/Member';
import { TableName } from '../../interfaces/TableName';
import { Dependent } from 'entities/Dependent';
import { Contribution } from 'entities/Contribution';

const baseRepository = new BaseRepository<Member>({
  tableName: TableName.MEMBER,
  primaryKey: 'member_number',
});
const dependentRepository = new BaseRepository<Dependent>({
  tableName: TableName.DEPENDENT,
  primaryKey: 'id',
});

const contributionRepository = new BaseRepository<Contribution>({
  tableName: TableName.CONTRIBUTION,
  primaryKey: 'member_number',
});

const memberInteractor = new MemberInteractor(
  baseRepository,
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
router.post('/:id/dependents', memberController.onCreateDependent);
router.get('/:id/contributions', memberController.onGetContributions);
router.put('/:id', memberController.onReplaceMember);
router.patch('/:id', memberController.onUpdateMember);
router.delete('/:id', memberController.onDeleteMember);

export default router;
