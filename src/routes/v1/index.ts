import { Router } from 'express';
import memberRoutes from './memberRoutes';
import employerRoutes from './employerRoutes';
import dependentRoutes from './dependentRoutes';

const router = Router();

router.use('/members', memberRoutes);
router.use('/employers', employerRoutes);
router.use('/dependents', dependentRoutes);

export default router;
