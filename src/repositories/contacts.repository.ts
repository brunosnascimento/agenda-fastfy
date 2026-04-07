import { prisma } from '../database/prisma-client.js';
import type { Contact, ContactCreate, ContactCreateData, ContactRepository } from '../interfaces/contact.interface.js';

export class ContactRepositoryPrisma implements ContactRepository {
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId,
            },
        });
        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                // A cláusula OR é usada para verificar se existe um contato com o mesmo email ou telefone. Se um contato for encontrado com o email ou telefone fornecido, ele será retornado; caso contrário, a função retornará null.    
                OR: [
                    { email },
                    { phone }
                ]
            },
        });
        return result || null;
    }

    // Implementações futuras de busca por ID, atualização e deleção podem ser adicionadas aqui.
}