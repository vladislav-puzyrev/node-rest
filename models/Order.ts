import mongoose, { Schema, Document } from 'mongoose'

interface IOrder extends Document {
  date: number
  order: number
  list: Array<{
    name: string
    quantity: number
    cost: number
  }>
  user: number
}

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model<IOrder>('orders', orderSchema)
