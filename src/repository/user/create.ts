import { conn } from "../../lib/query-builder";
import { UserModel } from "../../model/user";

export const createUser = async (user: Omit<UserModel, 'id'>) => {
    try {
        await conn('user').insert(user);
    } catch (error) {
        console.error(error);
    }
  
}
