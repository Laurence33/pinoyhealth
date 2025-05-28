import { Router } from 'express';
import { MemberController } from '../../controllers/v1/memberController';
import { MemberInteractor } from '../../interactors/MemberInteractors';
import { MemberRepository } from '../../repositories/memberRepository';

const memberRepository = new MemberRepository();
const memberInteractor = new MemberInteractor(memberRepository);
const memberController = new MemberController(memberInteractor);

const router = Router();
router.get('/', memberController.onGetMembers);
router.post('/', memberController.onCreateMember);
router.put('/:id', memberController.onReplaceMember);
router.patch('/:id', memberController.onUpdateMember);
router.delete('/:id', memberController.onDeleteMember);

export default router;
