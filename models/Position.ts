import mongoose, { Schema } from 'mongoose'

const positionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model('positions', positionSchema)
