import { conn } from '../lib/query-builder'

export interface UserModel {
  id: number
  name: string
  email: string
  password: string
  status: number
  created_at: Date
  update_at: Date
}

export const userModel = {
  getAllUsers: async (): Promise<UserModel[]> => {
    try {
      const users = await conn.select('*').from('users')
      return users
    } catch (error) {
      throw error
    }
  }
}
