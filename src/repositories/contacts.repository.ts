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

    // O método findAllContacts é responsável por buscar todos os contatos associados a um determinado usuário. Ele recebe o ID do usuário como parâmetro e retorna uma lista de contatos relacionados a esse usuário. A consulta ao banco de dados é feita usando o Prisma, onde a cláusula where é utilizada para filtrar os contatos com base no userId fornecido. O resultado é uma lista de contatos que pertencem ao usuário especificado.    
    async findAllContacts(userId: string): Promise<Contact[]> {
        const result = await prisma.contacts.findMany({
            where: {
                userId,
            },
        });
        return result;
    }   

    async updateContact({ id, name, email, phone }: Contact): Promise<Contact> {   
        const result = await prisma.contacts.update({
            where: { id },
            data: { name, email, phone },
        });
        return result;
    }
    
    // Implementações futuras de busca por ID, atualização e deleção podem ser adicionadas aqui.
}
