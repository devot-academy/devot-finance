import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const privateKey: jwt.Secret =  process.env.JWT_TOKEN || 'devot-admin';

const config = {
    privateKey,
    expiresIn: '7d'
}

export default config
