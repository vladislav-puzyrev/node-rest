import { Request, Response } from 'express'

export function overview (req: Request, res: Response) {
  res.status(200).json({ login: true })
}

export function analytics (req: Request, res: Response) {
  res.status(200).json({ register: true })
}
