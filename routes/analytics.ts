import { Router } from 'express'
import * as controller from '../controllers/analytics'

const router = Router()

router.get('/overview', controller.overview)
router.get('/analytics', controller.analytics)

export default router
