export interface User {
    id: string
    name: string
    email: string
    // password: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserCreate {
    name: string
    email: string
    // password: string
}   

export interface userRepository {
    create(data: UserCreate): Promise<User>;
    findbyEmail(email: string): Promise<User | null>;
    // findAll(): User[];
    // findById(id: string): User | undefined;
    // update(id: string, updatedUser: Partial<Omit<User, 'id'>>): Promise<User | undefined>;
    // delete(id: string): Promise<boolean>;
}