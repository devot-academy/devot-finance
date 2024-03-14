import { Request, Response } from 'express'
import { userModel } from '../model/user'

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = (await userModel.getAllUsers()).find(
    user => user.email === email
  )

  if (!user) {
    return res.status(401).json({ message: 'Usuário não existe' })
  }

  if (user.password !== password) {
    return res
      .status(401)
      .json({ message: 'O email ou senha estão incorretos' })
  }

  res.status(200).json({ message: 'Autenticação bem-sucedida', user })
}
