import { Router } from 'express'
import passport from 'passport'
import upload from '../middlewares/multer'
import * as controller from '../controllers/category'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update)

export default router
