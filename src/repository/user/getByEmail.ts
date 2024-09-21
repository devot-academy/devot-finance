import { conn } from "../../lib/query-builder";
import { UserModel } from "../../model/user";

export const getUserByEmail = async (email: string): Promise<UserModel | null> => {
    try {
        if(!email) throw new Error('Email is required')

        const [user] = await conn.select('*').from('user').where({ email })

        if(!user) return null 
        
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
  
}
