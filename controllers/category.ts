import { Request, Response } from 'express'
import Category from '../models/Category'
import Position from '../models/Position'
import errorHandler from '../utils/errorHandler'

export async function getAll (req: Request, res: Response) {
  if (!req.user) return

  try {
    const categories = await Category.find({ user: req.user.id })
    res.status(200).json(categories)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function getById (req: Request, res: Response) {
  try {
    const categories = await Category.findById(req.params.id)
    res.status(200).json(categories)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function remove (req: Request, res: Response) {
  try {
    await Category.remove({ _id: req.params.id })
    await Position.remove({ category: req.params.id })
    res.status(200).json({
      message: 'Категория и её товары удалены.'
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function create (req: Request, res: Response) {
  if (!req.user) return

  try {
    const category = new Category({
      name: req.body.name,
      user: req.user.id,
      imageSrc: req.file ? req.file.path : ''
    })
    await category.save()
    res.status(201).json(category)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function update (req: Request, res: Response) {
  try {
    const updated = {
      name: req.body.name,
      imageSrc: req.file ? req.file.path : undefined
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { updated } },
      { new: true }
    )
    res.status(200).json(category)
  } catch (err) {
    errorHandler(err, res)
  }
}
