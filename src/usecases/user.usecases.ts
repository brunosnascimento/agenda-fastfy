import type { User, UserCreate, userRepository } from '../interfaces/user.interface.js';

// Use Case para criar um usuário 
// Toda a lógica de negócio relacionada à criação de um usuário deve ser implementada aqui, como validação de dados, regras de negócio, etc.
export class UserUseCase {
    
    // O private userRepository: userRepository; é uma propriedade da classe UserUseCase que armazena a instância do repositório injetado. Ela é marcada como private para indicar que deve ser acessada apenas dentro da classe UserUseCase.
    private userRepository: userRepository;

    // O repositório é injetado via construtor, permitindo a flexibilidade de trocar a implementação do repositório sem alterar a lógica de negócio.
    // O repositório é do tipo userRepository, que é uma interface que define os métodos que o repositório deve implementar.
    // A injeção de dependência é uma prática recomendada para manter o código modular e testável, permitindo a substituição de implementações concretas por mocks ou stubs durante os testes.
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    // O método create é responsável por criar um novo usuário. Ele recebe um objeto do tipo UserCreate, que contém os dados necessários para criar um usuário (como nome e email).
    // O método create do repositório é chamado para criar o usuário no banco de dados ou em qualquer outra fonte de dados. O resultado é retornado como um objeto do tipo User, que representa o usuário criado.
    async create({ name, email }: UserCreate): Promise<User> {
        const verifyUserExists = await this.userRepository.findbyEmail(email);
        if (verifyUserExists) {
            throw new Error('User already exists');
        }
        const result = await this.userRepository.create({ name, email });
        return result;
    }
}