import { Router } from 'express';
import { DependentController } from '../../controllers/v1/dependentController';
import { DependentInteractor } from '../../interactors/DependentInteractor';
import { BaseRepository } from '../../repositories/baseRepository';
import { TableName } from '../../interfaces/TableName';
import { Dependent } from 'entities/Dependent';
import { validatorMw } from '../../middlewares/validatorMw';
import { createUpdateDependentValidator } from '../../validators/createUpdateDependentValidator';

const baseRepository = new BaseRepository<Dependent>({
  tableName: TableName.DEPENDENT,
  primaryKey: 'dependent_id',
});
const dependentInteractor = new DependentInteractor(baseRepository);
const dependentController = new DependentController(dependentInteractor);

const router = Router();
router.get('/', dependentController.onGetDependents);
router.get('/:id', dependentController.onGetDependent);
router.patch(
  '/:id',
  validatorMw(createUpdateDependentValidator),
  dependentController.onUpdateDependent,
);
router.delete('/:id', dependentController.onDeleteDependent);

export default router;
