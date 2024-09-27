import { Request, Response } from 'express'
import * as userRepository from '../repository/user' 

import { USER_STATUS } from '../consts';

type IUserData = {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password }:IUserData = req.body || {};
  

    if (!name || !email || !password ) return res.status(500).json({
      message: "Campos incorretos",
    });
  
    const userAlreadyExists = await userRepository.getUserByEmail(email);
  
    if (userAlreadyExists) return res.status(500).json({
      message: "O usuário já esta cadastrado."
    })

    const now = new Date()
  
    const newUser = {
      name,
      email,
      password,
      status: USER_STATUS.ACTIVE,
      created_at: now,
      update_at: now
    }

    await userRepository.createUser(newUser);
  
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
}
export function listUsers(arg0: string, listUsers: any) {
  throw new Error('Function not implemented.')
}
