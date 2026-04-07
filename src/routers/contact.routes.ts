import type { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usercases.js';
import { ContactRepositoryPrisma } from '../repositories/contacts.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { ContactCreate } from '../interfaces/contact.interface.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

/**
 * A função contactRoutes define as rotas para o recurso de contatos.
 * Utiliza injeção de dependência para instanciar o repositório e o use case.
 */
export async function contactRoutes(fastify: FastifyInstance) {
    // Cria instâncias dos repositórios e do use case
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const contactUseCase = new ContactUseCase(contactRepository, userRepository);

    // Adiciona o middleware de autenticação para todas as rotas de contatos
    // O middleware authMiddleware é adicionado como um hook 'preHandler' para todas as rotas definidas dentro desta função. Isso significa que antes de qualquer rota ser processada, o middleware será executado para verificar a autenticação do usuário com base no e-mail fornecido no cabeçalho da requisição.
    // O middleware authMiddleware é responsável por verificar se o e-mail fornecido no cabeçalho 'email' pertence a um usuário válido no banco de dados. Se o e-mail não for fornecido ou se o usuário não for encontrado, o middleware retorna uma resposta de erro 401 (Unauthorized) e impede que a rota seja processada.
    // O uso do middleware de autenticação é uma prática comum para proteger rotas que exigem autenticação, garantindo que apenas usuários autorizados possam acessar os recursos protegidos.
    fastify.addHook('preHandler', authMiddleware);


    // Rota para criação de um novo contato
    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail
            });

            return reply.status(201).send(data);
        } catch (error) {
            // Em caso de erro (ex: contato já existe), retorna o erro para o cliente
            reply.send(error);
        }
    });

    // Rota para busca de contatos  
    fastify.get('/', async (request, reply) => {
        const emailUser = request.headers['email'] as string;
      try {     
        const data = await contactUseCase.listAllContacts(emailUser);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    fastify.put<{ Body: ContactCreate, Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.updateContact({ id, name, email, phone });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }   
    });

    fastify.delete('/:id', async (request, reply) => {
        return reply.send('Rota de deleção de contato - Em desenvolvimento');
    }); 
}
