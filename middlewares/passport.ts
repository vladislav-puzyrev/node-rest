import { Strategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET_KEY } from '../config'
import User from '../models/User'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY
}

export default new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id)

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    console.log(err)
  }
})
