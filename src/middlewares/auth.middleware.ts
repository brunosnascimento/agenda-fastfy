import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';

/**
 * Middleware para verificar se o e-mail fornecido no cabeçalho 'email' 
 * pertence a um usuário válido no banco de dados.
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const email = request.headers['email'] as string;
    // Verifica se o e-mail foi fornecido no cabeçalho da requisição
    if (!email) {
        return reply.status(401).send({ message: 'Email header is required' });
    }

    // Cria uma instância do UserRepositoryPrisma para acessar o banco de dados
    const userRepository = new UserRepositoryPrisma();
    const user = await userRepository.findbyEmail(email);

    // Verifica se o usuário foi encontrado no banco de dados
    if (!user) {
        return reply.status(401).send({ message: 'User not found' });
    }   
}