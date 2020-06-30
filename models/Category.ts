import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

export default mongoose.model('categories', categorySchema)
