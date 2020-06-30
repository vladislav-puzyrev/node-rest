import { Router } from 'express'
import authRoutes from './auth'
import analyticsRoutes from './analytics'
import categoryRoutes from './category'
import orderRoutes from './order'
import positionRoutes from './position'

const router = Router()

router.use('/auth', authRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/category', categoryRoutes)
router.use('/order', orderRoutes)
router.use('/position', positionRoutes)

export default router
