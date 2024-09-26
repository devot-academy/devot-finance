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

export const getByEmail = async (email: string): Promise<AuthModel | null> => {
    try {
        if(!email) throw new Error('Email is required');

        const [auth] = await conn.select('*').from('auth').where({ email })

        if(!auth) return null 
        
        return auth;
    } catch (error) {
        console.error(error)
        return null;
    }
} 

export const removeTokenById = async (id: number) => {
    try {
        if(!id) throw new Error("ID is required");

        await conn.delete().from('auth').where({ id })
        
    } catch (error) {
        console.error(error)
    }
}