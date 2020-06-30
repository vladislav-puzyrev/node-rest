import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET_KEY } from '../config'
import User from '../models/User'
import errorHandler from '../utils/errorHandler'

export async function login (req: Request, res: Response) {
  // email, password, if user email exist - if password correct - send token else error, else error
  const candidate = await User.findOne({ email: req.body.email })

  console.log(req.body.password)

  if (candidate) {
    // Пользователь существует, нужно проверить пароль
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isPasswordCorrect) {
      // Пароль верный, нужно сгенерировать токен
      const token = jwt.sign({
        id: candidate._id,
        email: candidate.email
      }, JWT_SECRET_KEY, { expiresIn: 60 * 60 })

      res.status(200).send({
        token: `Bearer ${token}`
      })
    } else {
      // Пароли не совпали
      res.status(401).send({
        message: 'Неверный пароль'
      })
    }
  } else {
    // Пользователя не существует, нужна дать ошибку
    res.status(404).send({
      message: 'Пользователя с таким email не существует'
    })
  }
}

export async function register (req: Request, res: Response) {
  // email, password, if already exist user - error, else - get hash pass and save data
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    // Пользователь существует, нужно отдать ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    // Нужно создать пользователя
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}
