import { Request, Response } from 'express'
import * as userRepository from '../repository/user'
import { USER_STATUS } from '../consts'

type IUserData = {
  name: string
  email: string
  password: string
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: IUserData = req.body || {}

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Campos incorretos'
    })
  }

  const userAlreadyExists = await userRepository.getUserByEmail(email)

  if (userAlreadyExists) {
    return res.status(409).json({
      message: 'O usuário já está cadastrado.'
    })
  }

  const now = new Date()

  const newUser = {
    name,
    email,
    password,
    status: USER_STATUS.ACTIVE,
    created_at: now,
    update_at: now
  }

  await userRepository.createUser(newUser)

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
}

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getAll()

    res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar usuários'
    })
  }
}
