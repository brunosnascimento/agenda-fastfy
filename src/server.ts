// O arquivo src/server.ts é o ponto de entrada do servidor Fastify. Ele configura o servidor, registra as rotas e inicia a escuta para as requisições.
// Ele importa as dependências necessárias, incluindo o Fastify e as rotas definidas em src/routers/user.routes.ts. O servidor é configurado para usar um logger para facilitar a depuração e o monitoramento das requisições.
// O servidor é iniciado na porta 3000, e um callback é fornecido para lidar com erros ou para confirmar que o servidor está ouvindo corretamente. O uso do logger integrado do Fastify permite que as mensagens de log sejam registradas de forma estruturada, facilitando a análise e o monitoramento do servidor em produção.  
// dotenv é uma biblioteca que carrega variáveis de ambiente de um arquivo .env para process.env, permitindo que as configurações sensíveis sejam mantidas fora do código-fonte.
import 'dotenv/config';
import fastify from "fastify";
import type {FastifyInstance} from "fastify";
import { userRoutes } from "./routers/user.routes.js";

// O Fastify é um framework web para Node.js que é conhecido por sua alta performance e baixo overhead. Ele é projetado para ser rápido e eficiente, tornando-o uma escolha popular para construir APIs e aplicativos web.
const app: FastifyInstance = fastify({ logger: true });

// O método register é usado para registrar as rotas definidas na função userRoutes. 
// O prefixo '/users' é adicionado a todas as rotas definidas em userRoutes, o que significa que as rotas relacionadas a usuários estarão disponíveis em URLs que começam com '/users' (por exemplo, '/users/' para criar um novo usuário).
// A função userRoutes é responsável por definir as rotas relacionadas aos usuários. Ela recebe uma instância do Fastify como parâmetro, que é usada para registrar as rotas. Dentro da função, uma instância do UserRepositoryPrisma é criada e passada para o construtor do UserUseCase, permitindo que a lógica de negócio relacionada aos usuários seja desacoplada da implementação do repositório.
app.register(userRoutes, { prefix: '/users' });

// O método listen é usado para iniciar o servidor e escutar as requisições na porta 3000. Ele aceita um callback que é chamado quando o servidor está pronto para receber requisições ou se ocorrer um erro durante a inicialização.
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
  } else {
    app.log.info(`Server listening at ${address}`);
    console.log(`Outra forma de envio de mensagem no log...`);
  }
});


