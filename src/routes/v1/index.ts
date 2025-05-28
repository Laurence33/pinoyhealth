import { Router } from 'express';
import memberRoutes from './memberRoutes';

const router = Router();

router.use('/members', memberRoutes);

export default router;
