import { SystemUserRepository } from "@infra/repositories/systemUserRepository";
import { SystemUserUseCase } from "@useCases/user";
import { UserController } from "./userController";

const systemUserRepository = new SystemUserRepository();
const systemUserUseCase = new SystemUserUseCase(systemUserRepository);

export const userController = new UserController(systemUserUseCase);
