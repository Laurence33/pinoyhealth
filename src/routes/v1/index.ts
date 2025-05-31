import { Router } from 'express';
import memberRoutes from './memberRoutes';
import employerRoutes from './employerRoutes';

const router = Router();

router.use('/members', memberRoutes);
router.use('/employers', employerRoutes);

export default router;
