export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    // address?: string;
    // birthday?: Date;
}

// A interface ContactCreate define os campos necessários para criar um novo contato. Ela inclui o nome, email, telefone e o email do usuário ao qual o contato pertence (userEmail). O campo userEmail é utilizado para identificar o usuário ao qual o contato pertence. Ele é necessário para validar a existência do usuário e associar o contato corretamente.
export interface ContactCreate {
    name: string;
    email: string;
    phone: string;
    userEmail: string; // O campo userEmail é utilizado para identificar o usuário ao qual o contato pertence. Ele é necessário para validar a existência do usuário e associar o contato corretamente.
}

// A interface ContactRepository define os métodos que um repositório de contatos deve implementar. Ela inclui métodos para criar um contato e para verificar se já existe um contato com o mesmo email ou telefone. Comentários adicionais indicam que futuras implementações podem incluir métodos para buscar por ID, atualizar e deletar contatos.  
export interface ContactCreateData {
    name: string;
    email: string;
    phone: string;
    userId: string;
}

export interface ContactRepository {
    // O método create é responsável por criar um novo contato. Ele recebe um objeto do tipo ContactCreateData, que contém os dados necessários para criar um contato (como nome, email, telefone e o ID do usuário ao qual o contato pertence). O método retorna uma Promise que resolve para um objeto do tipo Contact, representando o contato criado.
    create(data: ContactCreateData): Promise<Contact>;
    findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>;
    // findById(id: string): Promise<Contact | null>;
    // update(id: string, updatedContact: Partial<Omit<Contact, 'id'>>): Promise<Contact | null>;
    // delete(id: string): Promise<boolean>;
}