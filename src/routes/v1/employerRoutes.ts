import { Router } from 'express';
import { EmployerController } from '../../controllers/v1/employerController';
import { EmployerInteractor } from '../../interactors/EmployerInteractor';
import { BaseRepository } from '../../repositories/baseRepository';
import { TableName } from '../../interfaces/TableName';
import { Employer } from 'entities/Employer';

const baseRepository = new BaseRepository<Employer>({
  tableName: TableName.EMPLOYER,
  primaryKey: 'employer_number',
});
const employerInteractor = new EmployerInteractor(baseRepository);
const employerController = new EmployerController(employerInteractor);

const router = Router();
router.get('/', employerController.onGetEmployers);
// router.post(
//   '/',
//   validatorMw(createEmployerValidator),
//   employerController.onCreateEmployer,
// );
router.get('/:id', employerController.onGetEmployer);
// router.put('/:id', employerController.onReplaceEmployer);
// router.patch('/:id', employerController.onUpdateEmployer);
// router.delete('/:id', employerController.onDeleteEmployer);

export default router;
