import { UserRepository } from "@domain/repositories/userRepository";
import { UserUseCase } from "./types";
import { User } from "@domain/entities/user";


export class SystemUserUseCase implements UserUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}
