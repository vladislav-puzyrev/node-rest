import { Request, Response } from 'express'
import Position from '../models/Position'
import errorHandler from '../utils/errorHandler'

export async function getByCategoryId (req: Request, res: Response) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user
    })
    res.status(200).json(positions)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function create (req: Request, res: Response) {
  if (!req.user) return

  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save()
    res.status(201).json(position)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function remove (req: Request, res: Response) {
  try {
    await Position.remove({ _id: req.params.id })
    res.status(200).json({
      message: 'Позиция удалена'
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function update (req: Request, res: Response) {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(position)
  } catch (err) {
    errorHandler(err, res)
  }
}
