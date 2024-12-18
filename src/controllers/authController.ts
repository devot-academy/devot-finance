import { Request, Response } from 'express'
import * as userRepository from '../repository/user'
import * as authRepository from '../repository/auth'
import { createToken, decodeToken } from '../lib/jwt'

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExists = await userRepository.getUserByEmail(email);

  if (!userExists ) {
    return res.status(400).json({ message: 'O email ou a senha está inválida.' })
  }

  const { id } = userExists;


  if(userExists.password !== password) {
    return res.status(400).json({ message: 'O email ou a senha está inválida.' })
  }

  const authExists = await authRepository.getByEmail(email);

  if (authExists && decodeToken(authExists?.token)) {
      return res.status(200).json({ 
        token: authExists?.token,
        userId: id
      })
  }

  if (authExists && !decodeToken(authExists?.token)) {
    const newToken = createToken({ email })

    await authRepository.removeTokenById(authExists.id)
    await authRepository.create({ 
      email,
      token: newToken as string,
    })

    return res.status(200).json({ 
      token: newToken,
      userId: id
    })
  }

  const newToken = createToken({ email })
  await authRepository.create({ 
    email,
    token: newToken as string,
  })

  return res.status(200).json({ 
    token: newToken,
    userId: id
  })
}


