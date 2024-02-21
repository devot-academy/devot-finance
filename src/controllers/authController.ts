import { Request, Response } from 'express'

export const authenticateUser = (req: Request, res: Response) => {
  const { email, password } = req.body

  const authenticatedUser = {
    id: 1,
    name: 'Usuário Autenticado',
    email,
    password: '***',
    status: 1,
    created_at: new Date(),
    update_at: new Date()
  }

  res.json(authenticatedUser)
}
