import { Router } from 'express';
import memberRoutes from './memberRoutes';
import employerRoutes from './employerRoutes';
import dependentRoutes from './dependentRoutes';
import contributionRoutes from './contributionRoutes';

const router = Router();

router.use('/members', memberRoutes);
router.use('/employers', employerRoutes);
router.use('/dependents', dependentRoutes);
router.use('/contributions', contributionRoutes);

export default router;
