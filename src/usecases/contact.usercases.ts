import type { Contact, ContactCreate, ContactRepository } from '../interfaces/contact.interface.js';
import type { userRepository } from '../interfaces/user.interface.js';

// A classe ContactUseCase é responsável por encapsular a lógica de negócios relacionada à criação de contatos. Ela depende de um repositório de contatos (ContactRepository) para interagir com a camada de dados e de um repositório de usuários (userRepository) para validar a existência do usuário associado ao contato.
export class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: userRepository;

    constructor(contactRepository: ContactRepository, userRepository: userRepository) {

        // O contactRepository é injetado via construtor, permitindo a flexibilidade de trocar a implementação do repositório sem alterar a lógica de negócio.  
        this.contactRepository = contactRepository;

        // O userRepository é injetado via construtor, permitindo a flexibilidade de trocar a implementação do repositório sem alterar a lógica de negócio.
        this.userRepository = userRepository;
    }

    // O método create é responsável por criar um novo contato. Ele recebe um objeto do tipo ContactCreate, que contém os dados necessários para criar um contato (como nome, email, telefone e o email do usuário ao qual o contato pertence).
    async create({ name, email, phone, userEmail }: ContactCreate): Promise<Contact> {
        // 1. Validar se o usuário (dono do contato) existe
        // Nota: No userRepository o método está escrito como 'findbyEmail'
        const user = await this.userRepository.findbyEmail(userEmail);

        // Se o usuário não for encontrado, lança um erro indicando que o usuário não existe. Isso é importante para garantir que um contato só possa ser criado para um usuário válido, evitando a criação de contatos órfãos ou associados a usuários inexistentes.
        if (!user) {
            throw new Error('User not found');
        }   
        
        // 2. Verificar se já existe um contato com o mesmo email ou telefone
        const contactExists = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (contactExists) {
            throw new Error('Contact with this email or phone already exists');
        }

        // 3. Criar o contato usando o repositório de contatos
        // Nota: No contactRepository o método está escrito como 'create'
        // O método create do repositório é chamado para criar o contato no banco de dados ou em qualquer outra fonte de dados. O resultado é retornado como um objeto do tipo Contact, que representa o contato criado.
        const result = await this.contactRepository.create({
            name,
            email,
            phone,
            userId: user.id,
        });

        return result;
    }
}