import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const privateKey: jwt.Secret =  process.env.PRIVATE_KEY_TOKEN || 'devot-admin';

const config = {
    privateKey,
    expiresIn: '7d'
}

export default config
