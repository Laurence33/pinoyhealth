import { Router } from 'express';
import { MemberController } from '../../controllers/v1/memberController';
import { MemberInteractor } from '../../interactors/MemberInteractor';
import { validatorMw } from '../../middlewares/validatorMw';
import { createMemberValidator } from '../../validators/createMemberValidator';
import { BaseRepository } from '../../repositories/baseRepository';
import { Member } from '../../entities/Member';
import { TableName } from '../../interfaces/TableName';

const baseRepository = new BaseRepository<Member>({
  tableName: TableName.MEMBER,
  primaryKey: 'member_number',
});
const memberInteractor = new MemberInteractor(baseRepository);
const memberController = new MemberController(memberInteractor);

const router = Router();
router.get('/', memberController.onGetMembers);
router.post(
  '/',
  validatorMw(createMemberValidator),
  memberController.onCreateMember,
);
router.get('/:id', memberController.onGetMember);
router.put('/:id', memberController.onReplaceMember);
router.patch('/:id', memberController.onUpdateMember);
router.delete('/:id', memberController.onDeleteMember);

export default router;
