import { Router } from 'express';
import { ContributionController } from '../../controllers/v1/contributionController';
import { ContributionRepository } from '../../repositories/contributionRepository';
import { ContributionInteractor } from '../../interactors/ContributionInteractor';
import { validatorMw } from '../../middlewares/validatorMw';
import { updateContributionValidator } from '../../validators/updateContributionValidator';

const contributionRepository = new ContributionRepository();
const contributionInteractor = new ContributionInteractor(
  contributionRepository,
);
const contributionController = new ContributionController(
  contributionInteractor,
);

const router = Router();
router.patch(
  '/',
  validatorMw(updateContributionValidator),
  contributionController.onUpdateContribution,
);

export default router;
