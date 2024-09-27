import jwt from 'jsonwebtoken'
import config from './config'

export const createToken = (payload: { email: string }) => {
    try {
        return jwt.sign(payload, config.privateKey, { expiresIn: config.expiresIn })
    } catch (error) {
        return false
    }
}

export const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, config.privateKey)
    } catch (error) {
        return false
    }
}