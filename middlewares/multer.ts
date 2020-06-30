import multer from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, 'uploads/images')
  },
  filename (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, `${file.originalname}-${Date.now()}`)
  }
})

function fileFilter (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5 // В байтах (5MB)
}

export default multer({ storage, fileFilter, limits })
