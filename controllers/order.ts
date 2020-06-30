import { Request, Response } from 'express'
import Order from '../models/Order'
import errorHandler from '../utils/errorHandler'

export async function getAll (req: Request, res: Response) {
  if (!req.user) return

  try {
    const query = {
      user: req.user.id
    }

    if (req.query.start) {
      // @ts-ignore
      query.date = {
        $gte: req.query.start
      }
    }

    if (req.query.end) {
      // @ts-ignore
      if (!query.date) {
        // @ts-ignore
        query.date = {}
      }
      // @ts-ignore
      query.date.$lte = req.query.end
    }

    if (req.query.order) {
      // @ts-ignore
      query.order = +req.query.order
    }

    const orders = await Order.find(query).sort({ date: -1 }).skip(+req.query.skip).limit(+req.query.limit)
    res.status(200).json(orders)
  } catch (err) {
    errorHandler(err, res)
  }
}

export async function create (req: Request, res: Response) {
  if (!req.user) return

  try {
    // Самый последний заказ
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({ date: -1 })
    const maxOrder = lastOrder ? lastOrder.order : 0

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save()

    res.status(201).json(order)
  } catch (err) {
    errorHandler(err, res)
  }
}
