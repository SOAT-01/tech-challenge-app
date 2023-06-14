import { User } from "core/domain/entities/user";

export interface UserUseCase {
    getUsers: () => Promise<User[]>;
}
