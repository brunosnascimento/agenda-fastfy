# Agenda Fastify API

Uma API robusta e performática para gerenciamento de contatos, construída com Node.js, Fastify, TypeScript e Prisma. O projeto segue princípios de Clean Architecture para garantir manutenibilidade e escalabilidade.

## 🚀 Tecnologias Utilizadas

- **Fastify**: Framework web focado em performance.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Prisma**: ORM moderno para interação com o banco de dados.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## 🏗️ Arquitetura do Projeto

O código está organizado seguindo a separação de responsabilidades:

- `src/interfaces`: Define as estruturas de dados (DTPs) e os contratos (interfaces) dos repositórios.
- `src/repositories`: Implementações concretas de acesso a dados (Ex: Prisma).
- `src/usecases`: Contém a lógica de negócio da aplicação.
- `src/routers`: Definições de rotas HTTP e injeção de dependências.
- `src/middlewares`: Hooks de segurança e validação (Ex: Autenticação).
- `src/server.ts`: Ponto de entrada que configura e inicializa o servidor.

## 🛠️ Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure a URL do seu banco de dados.

3. **Execute as migrações do Prisma:**
   ```bash
   npx prisma migrate dev
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

---

## 📑 Guia: Criando uma Nova Funcionalidade (Ex: Deletar Contato)

Para adicionar uma nova parte ao CRUD, siga estes 5 passos fundamentais:

### 1. Definir a Interface
No arquivo `src/interfaces/contact.interface.ts`, adicione o método necessário ao contrato do repositório:
```typescript
export interface ContactRepository {
    // ... outros métodos
    delete(id: string): Promise<void>;
}
```

### 2. Implementar no Repositório
No arquivo `src/repositories/contacts.repository.ts`, implemente a lógica de acesso ao banco usando o Prisma:
```typescript
async delete(id: string): Promise<void> {
    await prisma.contact.delete({
        where: { id }
    });
}
```

### 3. Criar a Regra de Negócio (Use Case)
No arquivo `src/usecases/contact.usercases.ts`, adicione o método que orquestra a funcionalidade:
```typescript
async delete(id: string) {
    // Validações de negócio aqui (ex: verificar se o contato existe antes de deletar)
    await this.contactRepository.delete(id);
}
```

### 4. Criar a Rota HTTP
No arquivo `src/routers/contact.routes.ts`, registre o novo endpoint:
```typescript
fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
        await contactUseCase.delete(id);
        return reply.status(204).send();
    } catch (error) {
        return reply.send(error);
    }
});
```

### 5. Registrar no Servidor
Se você criou um recurso totalmente novo (ex: `/tasks`), lembre-se de registrá-lo no `src/server.ts` usando o método `app.register()`.

---

## 🔒 Segurança
A API utiliza um middleware de autenticação baseado em e-mail enviado no header da requisição. Certifique-se de incluir o header `email` em todas as rotas protegidas.

```http
GET /contacts HTTP/1.1
Host: localhost:3000
email: usuario@exemplo.com
```

## 📑 OBS :: Passo a Passo para dev

Para criar uma nova feature, uma possibilidade é seguir os seguintes passos:
Routes >> UseCases >> Interfaces >> Repositories >> Server (Se tiver uma nova rota - prefix)


---
Desenvolvido por Bruno Nascimento.