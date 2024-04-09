import { Request, Response } from 'express'
import * as userRepository from '../repository/user'
import { createToken, decodeToken } from '../lib/jwt'

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExists = await userRepository.getUserByEmail(email)

  if (!userExists) {
    return res.status(401).json({ message: 'Usuário não existe' })
  }

  // if (user.password !== password) {
  //   return res
  //     .status(401)
  //     .json({ message: 'O email ou senha estão incorretos' })
  // }

  // res.status(200).json({ message: 'Autenticação bem-sucedida', user })
}


