import { Router } from 'express'
import * as controller from '../controllers/order'
import passport from 'passport'

const router = Router()

router.post('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/', passport.authenticate('jwt', { session: false }), controller.create)

export default router
