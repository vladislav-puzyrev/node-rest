import { Response } from 'express'

export default function errorHandler (err: Error, res: Response) {
  res.status(502).json({
    error: `${err.name} - ${err.message}`
  })
}
