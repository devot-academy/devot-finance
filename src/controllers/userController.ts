import { Request, Response } from 'express'

export const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const newUser = {
    id: 1,
    name,
    email,
    password,
    status: 1,
    created_at: new Date(),
    update_at: new Date()
  }

  res.status(201).json(newUser)
}
export function listUsers(arg0: string, listUsers: any) {
  throw new Error('Function not implemented.')
}
