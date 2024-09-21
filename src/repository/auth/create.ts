import { conn } from "../../lib/query-builder";
import { AuthModel } from "../../model/auth";

export const create = async (auth: Omit<AuthModel, 'id' | 'createdAt'>) => {
    try {
        const { email, token } = auth

        const createdAt = new Date()

        await conn('auth').insert({
            email,
            token,
            createdAt
        });
    } catch (error) {
        console.error(error);
    }
  
}
