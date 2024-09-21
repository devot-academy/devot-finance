import { conn } from '../../lib/query-builder'
import { UserModel } from '../../model/user'

export const getUserById = async (
  userId: number
): Promise<UserModel | null> => {
  try {
    if (!userId) throw new Error('User ID is required')

    const [user] = await conn.select('*').from('user').where({ id: userId })

    if (!user) return null

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
