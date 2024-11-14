import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getByEmail } from '../repository/auth'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Token não fornecido. Não autorizado' })
  }

  const token = authorization.split(' ')[1]

  try {
    const secretKey = process.env.JWT_SECRET || 'your_secret_key'
    const tokenDecoded = jwt.verify(token, secretKey) as { email: string }

    if (!tokenDecoded) {
      return res.status(401).json({ message: 'Token inválido. Não autorizado' })
    }

    const { email } = tokenDecoded

    const userAuth = await getByEmail(email)

    if (!userAuth) {
      return res
        .status(401)
        .json({ message: 'Usuário não encontrado. Não autorizado' })
    }

    const { token: oldToken } = userAuth

    if (token !== oldToken) {
      return res
        .status(401)
        .json({ message: 'Token expirado ou inválido. Não autorizado' })
    }

    req.user = userAuth

    next()
  } catch (error) {
    console.error('Erro na verificação do token:', error)
    return res.status(401).json({ message: 'Token inválido ou expirado.' })
  }
}
