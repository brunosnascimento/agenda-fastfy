import type { FastifyInstance } from 'fastify';
import { UserUseCase } from '../usecases/user.usecases.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { UserCreate } from '../interfaces/user.interface.js';


// A função userRoutes é responsável por definir as rotas relacionadas aos usuários. Ela recebe uma instância do Fastify como parâmetro, que é usada para registrar as rotas.
// Dentro da função, uma instância do UserRepositoryPrisma é criada e passada para o construtor do UserUseCase, permitindo que a lógica de negócio relacionada aos usuários seja desacoplada da implementação do repositório.
export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepositoryPrisma();
    const userUseCase = new UserUseCase(userRepository);

    // A rota POST '/' é definida para criar um novo usuário. Ela espera receber um objeto do tipo UserCreate no corpo da requisição, que contém os dados necessários para criar um usuário (como nome e email).
    // Dentro do handler da rota, os dados do corpo da requisição são extraídos e passados para o método create do UserUseCase. O resultado é enviado de volta como resposta com o status 201 (Created) se a criação for bem-sucedida. Caso ocorra um erro, ele é capturado e enviado como resposta.
    // O tipo <{ Body: UserCreate }> é usado para informar ao Fastify que o corpo da requisição deve ser do tipo UserCreate, permitindo a validação e o autocompletar durante o desenvolvimento.
    // O uso de async/await permite lidar com operações assíncronas de forma mais legível e fácil de entender, especialmente quando se trata de chamadas a bancos de dados ou outras operações que podem levar algum tempo para serem concluídas.
    // A definição da rota dentro da função userRoutes permite que as rotas sejam organizadas de forma modular, facilitando a manutenção e a escalabilidade do código. Cada conjunto de rotas relacionadas a um recurso específico (como usuários) pode ser definido em um arquivo separado, mantendo o código limpo e organizado.
    // A injeção de dependência do UserUseCase com o UserRepositoryPrisma permite que a lógica de negócio (UserUseCase) seja desacoplada da implementação do repositório (UserRepositoryPrisma), facilitando a substituição de implementações e a testabilidade do código.
    // A estrutura geral do código segue os princípios de Clean Architecture, onde as camadas de apresentação (rotas), aplicação (use cases) e infraestrutura (repositórios) são separadas, promovendo a modularidade e a manutenibilidade do código.
    // A abordagem adotada neste código é uma boa prática para projetos de médio a grande porte, onde a organização e a separação de responsabilidades são essenciais para manter o código limpo e fácil de entender.
    // request.body é do tipo UserCreate, que é uma interface que define os campos necessários para criar um usuário (name e email). O Fastify valida automaticamente o corpo da requisição com base nessa definição, garantindo que os dados recebidos estejam no formato esperado.
    // request e reply são objetos fornecidos pelo Fastify para lidar com a requisição e a resposta. request contém informações sobre a requisição recebida, enquanto reply é usado para enviar a resposta de volta ao cliente.
    fastify.post<{ Body: UserCreate }>('/', async (request, reply) => {
        const { name, email } = request.body;
        // O uso de try/catch é importante para lidar com possíveis erros que possam ocorrer durante a criação do usuário, como erros de validação, problemas de conexão com o banco de dados, etc. Isso garante que o servidor possa responder adequadamente em caso de falhas, em vez de simplesmente travar ou retornar uma resposta genérica de erro.
        try {
            // O método create do UserUseCase é chamado para criar o usuário no banco de dados ou em qualquer outra fonte de dados.
            // O resultado é retornado como um objeto do tipo User, que representa o usuário criado.
            const data = await userUseCase.create({
                name,
                email,
            });
            // O status 201 (Created) é usado para indicar que um novo recurso foi criado com sucesso. O método send é usado para enviar a resposta de volta ao cliente, contendo os dados do usuário criado.
            return reply.status(201).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    // A rota GET '/' é definida para retornar uma mensagem de "Hello World!" como resposta. Esta rota é apenas um exemplo simples para demonstrar como definir uma rota GET no Fastify. Em um cenário real, esta rota poderia ser usada para listar usuários ou fornecer outras funcionalidades relacionadas a usuários.
    fastify.get('/', async (request, reply) => {
        return reply.send('Hello World!');
    });


    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };    
        // Aqui você pode implementar a lógica para deletar o usuário com base no ID fornecido
        // Por exemplo, você pode chamar um método do UserUseCase para deletar o usuário do banco de dados
        // const result = await userUseCase.delete(id);
        // return reply.send(result);
        return reply.send(`User with ID ${id} deleted`);
    });

}
