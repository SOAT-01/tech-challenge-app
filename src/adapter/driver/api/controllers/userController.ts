import { UserUseCase } from "@useCases/user/types";
import { Request, Response } from "express";

export class UserController {
    private readonly userUseCase: UserUseCase;

    constructor(userUseCase: UserUseCase) {
        this.userUseCase = userUseCase;
    }

    public async get(req: Request, res: Response): Promise<Response> {
        const result = await this.userUseCase.getUsers();
        return res.status(200).json(result);
    }
}
