import { conn } from "../../lib/query-builder";
import { UserModel } from "../../model/user";

export const getAll = async (): Promise<UserModel[] | []> => {
    try {
        const users = await conn.select('*').from('user')
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
  
}
