import { Router } from 'express'
import * as controller from '../controllers/position'
import passport from 'passport'

const router = Router()

router.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

export default router
